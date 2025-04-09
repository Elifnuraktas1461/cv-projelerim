const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsList = document.querySelector('.cart-items');
const totalPriceElem = document.querySelector('.total-price');
const cartContainer = document.querySelector('.cart-container');
const closeCartBtn = document.querySelector('.close-cart-btn');
const viewCartBtn = document.querySelector('.view-cart-btn');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const themeToggleBtn = document.querySelector('.theme-toggle-btn');

// Sepete ürün ekleme fonksiyonu
addToCartBtns.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Sepette aynı üründen kaç tane var kontrol et
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      if (existingItem.quantity < 5) {
        existingItem.quantity++;
      } else {
        alert("Bu üründen en fazla 5 adet ekleyebilirsiniz!");
        return;
      }
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Sepeti görüntüle butonu
viewCartBtn.addEventListener('click', () => {
  cartContainer.style.display = 'flex';
});

// Sepeti kapatma butonu
closeCartBtn.addEventListener('click', () => {
  cartContainer.style.display = 'none';
});

// Sepet güncelleme fonksiyonu
function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - ${item.quantity} Adet - ${item.price * item.quantity}₺ 
      <button class="remove-item" data-index="${index}">❌</button>`;

    cartItemsList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalPriceElem.textContent = `Toplam: ${total}₺`;

  // LocalStorage'e kaydet
  localStorage.setItem('cart', JSON.stringify(cart));

  // Sepetten ürün silme butonlarını ekleyelim
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Tema geçişi
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    themeToggleBtn.textContent = '🌞'; // Aydınlık mod simgesi
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggleBtn.textContent = '🌙'; // Karanlık mod simgesi
    localStorage.setItem('theme', 'light');
  }
});

// Sayfa yüklendiğinde tema ve sepeti kontrol et
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '🌞';
  } else {
    document.body.classList.remove('dark-mode');
    themeToggleBtn.textContent = '🌙';
  }

  updateCart();
});
