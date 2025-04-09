require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB'ye bağlandı!"))
  .catch(err => console.log("MongoDB bağlantı hatası: ", err));

// Ürün şeması ve modeli
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model('Product', ProductSchema);

// Sepet şeması ve modeli
const CartSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number
});
const Cart = mongoose.model('Cart', CartSchema);

// Ürünleri listeleme (GET /products)
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Sepete ürün ekleme (POST /cart)
app.post('/cart', async (req, res) => {
  const { productId, name, price } = req.body;
  const existingItem = await Cart.findOne({ productId });
  
  if (existingItem) {
    if (existingItem.quantity < 5) {
      existingItem.quantity++;
      await existingItem.save();
    } else {
      return res.status(400).json({ message: "Bu üründen en fazla 5 adet eklenebilir!" });
    }
  } else {
    const newCartItem = new Cart({ productId, name, price, quantity: 1 });
    await newCartItem.save();
  }

  res.json(await Cart.find());
});

// Sepetten ürün çıkarma (DELETE /cart/:id)
app.delete('/cart/:id', async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json(await Cart.find());
});

// Sepeti getirme (GET /cart)
app.get('/cart', async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor!`);
});
 