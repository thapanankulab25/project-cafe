const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

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
router.get('/:productId', (req, res, next) => { // read a specific product by ID
  const productId = req.params.productId;
  Product.findById(productId).exec()
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      next(err);
    });
});


router.get('/', (req, res, next) => { //read
  Product.find().exec()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      next(err);
    });
});

// router.post('/updateU', async (req, res, next) => { //update
//   try {
//     const update_id = req.body.update_id;
//     const data = {
//       productname: req.body.productname,
//       type: req.body.type,
//       price: req.body.price,
//     };
//     console.log(update_id);
//     console.log(data);
//     await Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false });
//     res.redirect('/productU');
//   } catch (err) {
//     console.error('Error updating product:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

router.get('/deleteU/:id', (req, res, next) => { //delete
  Product.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
      res.redirect('/productU')
    })
    .catch(err => {
      next(err);
    });
});

router.post('/editproductU/:id', (req, res, next) => { //get parameter
  Product.findById(req.params.id)
    .then(editProduct => {
      if (!editProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.redirect('/editproductU')
    })
    .catch(err => {
      next(err);
    });
});

router.post('/editU/:id', async (req, res) => { //get data to update
  try {
    const productId = req.params.id;
    const editId = req.body.edit_id;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { id: editId } }, 
      { new: true }
    ).exec();
    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect(`/editproductU?id=${updatedProduct._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Multer Images Admin and insert 
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
router.post('/insertU', upload.single('image'), async (req, res, next) => { // insert
  try {
    console.log('Received form data:', req.body);
    console.log('Received file:', req.file);

    const product = await Product.create({
      productname: req.body.productname,
      type: req.body.type,
      price: req.body.price,
      image: req.file.filename,
    });
    console.log(req.query);
    res.redirect('/productU');
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

router.post('/updateU', upload.single('image'), async (req, res, next) => {
  try {
    const update_id = req.body.update_id;
    const data = {
      productname: req.body.productname,
      type: req.body.type,
      price: req.body.price,
    };

    if (req.file) {
      data.image = req.file.filename;
    }
    console.log(update_id);
    console.log(data);

    await Product.findByIdAndUpdate(update_id, data, { useFindAndModify: false });
    res.redirect('/productU');
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

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
