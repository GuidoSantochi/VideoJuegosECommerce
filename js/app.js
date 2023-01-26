const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
let amount = document.getElementById("usd")
let result_converter = document.getElementById("result")
/* Api Exchange */
let myHeaders = new Headers();
myHeaders.append("apikey", "3mxTGcV8ZHfIO5IYvoV7LzzxZoAKV8tz");

let requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some(
      (repeatProduct) => repeatProduct.id === product.id
    );
    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
    }
    carritoCounter();
    saveLocal();
    Toastify({
      text: "Añadido al carrito",
      duration: 2400,
      position: "right",
      gravity: "bottom",
    }).showToast();
  });
});

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
usd.addEventListener("keyup", () => {
  fetch(`https://api.apilayer.com/exchangerates_data/convert?to=USD&from=ARS&amount=${amount.value || 1}`, requestOptions)
  .then(response => response.json())
  .then(result => result_converter.innerText=parseFloat(result.result).toFixed(2))
  .catch(error => console.log('error', error));
})