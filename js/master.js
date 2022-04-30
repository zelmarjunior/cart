products = [
  {
    id: 1,
    name: "Engenharia de Software",
    author: 'Ian Sommerville',
    price: 149.9,
    stock: 5,
    orderLimit: 6,
    imgSource: './img/sommerville_es.jpeg'
  },
  {
    id: 2,
    name: "Como Convencer Alguém em 90 Segundos",
    author: ' Nicholas Boothman',
    price: 11,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/como-convencer.jpg'
  },
  {
    id: 3,
    name: "A Culpa é das Estrelas",
    author: ' Nicholas Boothman',
    price: 11,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/sommerville_es.jpeg'
  },
  {
    id: 4,
    name: "Foda-SE",
    author: ' Nicholas Boothman',
    price: 11,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/sommerville_es.jpeg'
  }
];

quantityOfProductsOnCart = 0;

reIndex = () => {
  //mudar para class

  for (let index = 0; index < quantityOfProductsOnCart; index++) {
    elementoQtd = document.getElementsByClassName('qutd')[index];
    elementoQtd.dataset.index = index;
    elementoDelete = document.getElementsByClassName('delete')[index];
    elementoDelete.dataset.indexDelete = index;
    elementoGift = document.getElementsByClassName('check')[index];
    elementoGift.dataset.index = index;

  }
}

addProduct = () => {
  quantityOfProductsOnCart++;


  if (quantityOfProductsOnCart > products.length) {
    alert('Cabô os produto!')
    quantityOfProductsOnCart--;
  } else {
    index = quantityOfProductsOnCart - 1;

    newProduct = document.createElement('article')
    newProduct.innerHTML =
      `<div class="produto">
        <div>
          <img class="miniatura" src=${products[index].imgSource} alt="Imagem do Produto">
        </div>
        <div class="nome">
          <p>${products[index].name}</p>
          <p class="autor">${products[index].author}</p>
        </div>
        <div class="checks">
          <input class="check" type="checkbox" name="check" data-index=${index}><p class="gift"> Para presente</br> (R$ 5,00)</p></input>
        </div>
        <div class="preco">
          <p>R$ <span id="valor" class="valor">${products[index].price}</span></p>
        </div>
        <div class="qtd">
          <input class="qutd" type="number" name="quantidade"  min="0" max=${products[index].orderLimit - 1} size="2" value="1" data-index=${index}>
        </div>
        <div>
          <img class="delete" src="./img/trash.png" alt="" data-indexDelete=${index}>
        </div>
      </div>`

    document.getElementById('container-cart').appendChild(newProduct);
    updateTotalPrice();
  }
}

removeProduct = (index) => {
  document.getElementsByClassName('produto')[index].parentNode.remove();
  setTimeout(() => {
    alert('Produto Removido Com Sucesso');
  }, 100);
  quantityOfProductsOnCart--;
  updateTotalPrice();
}

removeAllProducts = () => {
  quantityOfProductsOnCart = 0;
  updateTotalPrice();
  document.getElementsByClassName('produto')[index].parentNode.parentNode.remove();
  containerCart = document.createElement("section");
  containerCart.id = "container-cart"
  document.getElementById("main-container").appendChild(containerCart);
}

updateUnityPrice = (index, qtd, isGift) => {
  priceUpdated = isGift ? 5 : 0; 

  totalValueProduct = parseFloat(products[index].price) * qtd;
  console.log(totalValueProduct)

  priceUpdated += totalValueProduct;

  document.getElementsByClassName('valor')[index].innerHTML = priceUpdated;
  updateTotalPrice();
}

updateTotalPrice = () => {
  var newTotalPrice = 0;
  if (quantityOfProductsOnCart == 0) {
    document.getElementById('total-price').innerHTML = 0;
  }
  for (let index = 0; index < quantityOfProductsOnCart; index++) {
    newTotalPrice += parseFloat(document.getElementsByClassName('valor')[index].innerText);
  }

  document.getElementById('total-price').innerHTML = `${parseFloat(newTotalPrice)}`;
}

clickItem = (evento) => {
  const elemento = evento.target;

  if (elemento.value == 0) {
    removeProduct(elemento.dataset.index);
    reIndex();
  }
  else if (elemento.className == 'delete') {
    quantityOfProductsOnCart--;
    updateTotalPrice();
    elemento.parentNode.parentNode.remove();
    alert('Produto Removido com Sucesso!')
    reIndex();
  }
  else if (elemento.className == 'check') {
    quantity = document.getElementsByClassName('qutd')[elemento.dataset.index].value;
    if (elemento.checked) {
      updateUnityPrice(elemento.dataset.index, quantity, true)
    } else {
      updateUnityPrice(elemento.dataset.index, quantity, false)
    }
  }
  else {
    updateUnityPrice(elemento.dataset.index, elemento.value, false);
  }
}

document.getElementById("container-cart").addEventListener("click", clickItem);



//   arredonda valor
function arred(d, casas) {
  var aux = Math.pow(10, casas)
  return Math.floor(d * aux) / aux
}

// transforma string para float
function textToFloat(text) {
  var valor = text.replace("R$ ", "").replace(",", ".");
  return parseFloat(valor);
}

// transforma float para string
function floatToText(float) {
  var text = "R$ " + float;
  return text;
}





