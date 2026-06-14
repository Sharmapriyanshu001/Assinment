const express = require('express');
const { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  togglePublish 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All product routes require authentication
router.use(protect);

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router.patch('/:id/publish', togglePublish);

module.exports = router;
