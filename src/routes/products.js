// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
      //  cb(null, path.join(__dirname, '/CRUD/public/images/products')); 
      cb(null, path.join('./public/images/products'));
    }, 
    filename: function (req, file, cb) {
      console.log(file);
      const newFileName = 'product-' + Date.now() + path.extname(file.originalname);
      cb(null, newFileName);
    }
  });

  const uploadFile = multer({ storage: storage}); //puede ser solo storage

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);

/*** GET ONE PRODUCT ***/ 
// router.get('/:id', productsController.detail); 


// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', uploadFile.single('avatar'), productsController.newProduct);
// router.post('/create', productsController.create);
router.post('/create', uploadFile.single('image'), productsController.store); 


// /*** EDIT ONE PRODUCT ***/
router.get('/:id/edit', productsController.edit); 
router.put('/:id/update', productsController.update);


// /*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productsController.destroy);


module.exports = router;
