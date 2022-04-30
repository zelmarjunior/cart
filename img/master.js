products = [
  {
    id: 1,
    name: "Engenharia de Software",
    author: 'Ian Sommerville',
    price: 10,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/sommerville_es.jpeg'
  },
  {
    id: 2,
    name: "Como Convencer Alguém em 90 Segundos",
    author: ' Nicholas Boothman',
    price: 10,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/sommerville_es.jpeg'
  },
  {
    id: 3,
    name: "A Arte de Ligar o Foda-Se",
    author: 'Mark Manson',
    price: 10,
    stock: 5,
    orderLimit: 3,
    imgSource: './img/sommerville_es.jpeg'
  }
];

quantityOfProductsOnCart = 0;

addProduct = () => {
  quantityOfProductsOnCart += 1;
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
      <div class="preco">
          <p>R$ <span id="valor" class="valor">${products[index].price}</span></p>
      </div>
      <div class="qtd">
          <input type="number" name="quantidade" id="qutd" min="0" max=${products[index].orderLimit} size="2" value="1" data-index=${index}>
      </div>
    </div>`

  document.getElementById('container-cart').appendChild(newProduct);
  updateTotalPrice(products[index].price);

}

removeProduct = () => {
  console.log('Produto Removido')
}

updateUnityPrice = (index, qtd) => {
  console.log('Index: ' + index);
  console.log('Quantidade: ' + qtd);
  priceUpdated = parseFloat(products[index].price) * qtd;
  document.getElementsByClassName('valor')[index].innerHTML = priceUpdated;
  updateTotalPrice(priceUpdated);
}

updateTotalPrice = (priceUpdated) => {
  totalPrice = document.getElementById('total-price').innerText;
  newTotalPrice = parseFloat(totalPrice) + parseFloat(priceUpdated);
  document.getElementById('total-price').innerHTML = newTotalPrice;
}



clickItem = (evento) => {
  const elemento = evento.target;
  /*   updateTotalPrice(products[elemento.dataset.index].price) */
  if (elemento.value == products[index].orderLimit + 1) {
    alert('O item atingiu a quantidade Máxima permitida para compra!')
    console.log(elemento);
  } else if (elemento.value === 0) {
    removeProduct();
    console.log(elemento);
  }
  console.log(elemento);
  updateUnityPrice(elemento.dataset.index, elemento.value)
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





