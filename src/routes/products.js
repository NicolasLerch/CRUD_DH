// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, '../public/images/avatar'); 
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })
  const uploadFile = multer({ storage });

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index);

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail); 


// /*** CREATE ONE PRODUCT ***/ 
router.get('/create', uploadFile.single('avatar'), productsController.newProduct);
// router.post('/create', productsController.create);
router.post('/create', uploadFile.single('avatar'), productsController.store); 




// /*** EDIT ONE PRODUCT ***/
// router.???('/:id/???', productsController.edit); 
// router.???('/:id', productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
// router.???('/:id', productsController.destroy); 


module.exports = router;
