import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String,
  price: Number
}));

const newProduct = new Product({
  name: 'Sample Product',
  price: 100
});
const newProduct2 = new Product({
  name: 'Sample Product 2',
  price: 200
});
const newProduct3 = new Product({
  name: 'Sample Product 3',
  price: 300
});
const newProduct4 = new Product({
  name: 'Sample Product 4',
  price: 400
});
const newProduct5 = new Product({
  name: 'Sample Product 5',
  price: 500
});

const saveProducts = async () => {
  await newProduct.save();
  await newProduct2.save();
  await newProduct3.save();
  await newProduct4.save();
  await newProduct5.save();
};

saveProducts().then(() => {
  console.log('Sample products added.');
});

app.post('/search', async (req, res) => {
  try {
    const { productName } = req.body;

    const product = await Product.find({ name: productName });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
