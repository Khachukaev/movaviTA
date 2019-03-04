var buy = document.getElementById('purchase');//кнопка "оформить заказ"
var content = document.getElementById('bucketContent');
var wrapper = document.getElementById('wrapper');
var total = document.getElementById('totalPrice');//Всего руб.
//var br = document.createElement('br');
//var div = document.createElement('div');
//div.className = 'bucket__main-content__child';
//var xSpan = document.createElement('span'); //span для крестика удаления
//xSpan.className = 'delete-child';
//xSpan.id = 'delete-child';
//var nSpan = document.createElement('span'); //span для названия
//nSpan.className = 'child-name';
//var pSpan = document.createElement('span'); //span для цены
//pSpan.className = 'child-price';
var max = 10;
var count = 0;
var cart = [];
var products = [
    {id: 'id1', name: "Пакет видеопрограмм", price: 1990},
    {id: 'id2', name: "Фотостудия Movavi", price: 1890},
    {id: 'id3', name: "Movavi Фоторедактор", price: 990},
    {id: 'id4', name: "Movavi Пакетный фоторедактор", price: 490},
    {id: 'id5', name: "Захват видео с экрана", price: 1490}
];
 $(document).ready(function(){
   $("#bucket").sticky({topSpacing:0, center: true, className: "hey"});
 }); //"прилипание" для корзины

function getProductById(productId) {
  return products.find(product => product.id === productId);
}


// Ищем продукт по id и создаем Node с нужными свойствами.
// Потом мы добавим ее в div корзины.
function createCartEntry(productId) {
  var product = getProductById(productId);

  if (!product) {
    console.log('Product with id ' + productId + ' does not exist.');
    return;
  }

  var cartEntry = document.createElement('div');
  cartEntry.classList.add('bucket__main-content__child');
  cartEntry.dataset.id = productId;

  var deleteButton = document.createElement('span');
  deleteButton.classList.add('delete-child');
  deleteButton.textContent = 'x';

  var productName = document.createElement('span');
  productName.classList.add('child-name');
  productName.textContent = product.name;

  var productPrice = document.createElement('span');
  productPrice.classList.add('child-price');
  productPrice.textContent = product.price + ' руб.';

  cartEntry.appendChild(deleteButton);
  cartEntry.appendChild(productName);
  cartEntry.appendChild(productPrice);

  return cartEntry;
}

function renderCart() {
  content.innerHTML = '';

  cart.forEach(function(productId) {
    var product = createCartEntry(productId);
    content.appendChild(product);
  });
}

function recalculateTotalPrice() {
  var totalPrice = 0;

  cart.forEach(function(productId) {
    var product = getProductById(productId);
    totalPrice += product.price;
  });

  total.textContent = totalPrice + ' руб.';
}

wrapper.addEventListener('click', function(e) {
  var line = e.target.closest('.line');
  if (e.target.classList.contains('add') && cart.length < max) {
    cart.push(line.dataset.id);
    renderCart();
    recalculateTotalPrice();
  }
});

content.addEventListener('click', function(e) {
  var del = e.target.closest('.bucket__main-content__child');
  if (e.target.classList.contains('delete-child')) {
    cart = cart.filter(id => id !== del.dataset.id);
    del.remove();
    recalculateTotalPrice();
  }
});

buy.addEventListener('click', function() {
    alert('Вы приобрели ' + cart.length + ' товар(а/ов), на сумму ' + total.innerHTML);
});


//добавление одинаковых продуктов...


