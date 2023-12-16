const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Raw = require('../models/Raw.js');

router.get('/', (req, res, next) => { //get ข้อมูลทั้งหมด
  Raw.find()
    .then(raws => {
      res.json(raws);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => { //find products
    Raw.findById(req.params.id)
        .then(raw => {
          res.json(raw)
        })
        .catch(err => {
            next(err);
        });
});

router.post('/', (req, res, next) => { //Create products
  Raw.create(req.body)
    .then(raw => {
      res.json(raw)
    })
    .catch(err => {
      next(err);
    });
});

router.put('/:id', (req, res, next) => { //update products
  Raw.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedRaw => {
      res.json(updatedRaw);
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => { // delete products
  Raw.findByIdAndDelete(req.params.id)
    .then(deletedRaw => {
      if (!deletedRaw) {
        return res.status(404).json({ error: 'ไม่เจอวัตถุดิบ' });
      }
      res.json({ message: 'สินค้าถูกลบเรียบร้อยแล้ว', deletedRaw });
    })
    .catch(err => {
      next(err);
    });
});

//with web
router.get('/delete/:id', (req, res, next) => {
  Raw.findByIdAndDelete(req.params.id)
    .then(deletedProduct => {
      res.redirect('/raw')
    })
    .catch(err => {
      next(err);
    });
});

router.post('/insert', (req, res, next) => { //Create products
  Raw.create(req.body)
    .then(raw => {
      res.redirect('/raw')
    })
    .catch(err => {
      next(err);
    });
});

router.put('/update/:id', (req, res, next) => {
  Raw.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedRaw => {
      res.json(updatedRaw);
    })
    .catch(err => {
      next(err);
    });
});

router.post('/update', (req, res, next) => {
  Raw.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedRaw => {
      res.redirect('/raw')
    })
    .catch(err => {
      next(err);
    });
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
