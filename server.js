const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./controllers/productController');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/Marketplace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});

app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.createProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);
//app.get('/api/products', productController.getProductsByName); :(
app.delete('/api/products', productController.deleteAllProducts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});