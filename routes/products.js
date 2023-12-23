const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

router.get('/', (req, res, next) => { //get ข้อมูลทั้งหมด
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => { //find products
    Product.findById(req.params.id)
        .then(product => {
          res.json(product)
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', (req, res, next) => { //Create products
  Product.create(req.body)
    .then(product => {
      res.json(product)
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => { //update products
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => { // delete products
  Product.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
      if (!deletedProduct) {
        return res.status(404).json({ error: 'ไม่เจอสินค้า' });
      }
      res.json({ message: 'สินค้าถูกลบเรียบร้อยแล้ว', deletedProduct });
    })
    .catch(err => {
      next(err);
    });
});

router.put('/updateU/:id', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(err => {
      next(err);
    });
});

//with web
router.get('/delete/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
      res.redirect('/product')
    })
    .catch(err => {
      next(err);
    });
});

router.get('/update/:id', (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedProduct => {
      res.json(updatedProduct);
    })
    .catch(err => {
      next(err);
    });
});

// with user
router.get('/deleteU/:id', (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
      res.direct('/productU')
    })
    .catch(err => {
      next(err);
    });
});

// router.post('products/editproductU', (req, res) => {
//   const edit_id = req.body.edit_id;
//   Product.findById(edit_id).exec((err, doc) => {
//     if (err) {
//       console.error('Error finding product:', err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     console.log('productU', { product: doc });
//   });
// });
router.get('/editproductU/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(editProduct => {
      // Check if the product is found
      if (!editProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Render the 'editproductU' view with the editProduct data
      res.render('editproductU', { editProduct });
    })
    .catch(err => {
      next(err);
    });
});

// Multer Images Admin
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });
router.post('/insert', upload.single('image'), async (req, res, next) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);

    const product = await Product.create({
      productname: req.body.productname,
      type: req.body.type,
      price: req.body.price,
      image: req.file.filename, 
    });

    res.redirect('/product');
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }

});

// Multer Images User
router.post('/insertU', upload.single('image'), async (req, res, next) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);

    const product = await Product.create({
      productname: req.body.productname,
      type: req.body.type,
      price: req.body.price,
      image: req.file.filename,
    });

    res.redirect('/productU');
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});








// router.post('/update', async (req, res, next) => {
//   try {
//     const update_id = req.body.update_id;
//     const data = {
//       name: req.body.name,
//       type: req.body.type,
//       price: req.body.price,
//     };
//     await Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false });
//     res.redirect('/product');
//   } catch (err) {
//     console.error('Error updating product:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

module.exports = router;
