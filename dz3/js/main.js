"use strict";
const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
// только для первого задания! Далее не использовать в классах каталога и корзины!!!
// Не использовать fetch

// let getRequest = (url, cb) => {
//   // тут промис
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log("Error");
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };

//   xhr.send();
// };

// Решение пришлось подсмотреть, задания просто не понял.
// С промисами пришлось повозиться в доп источниках информации  yuotube
// Общий принцип работы я понял
// Promise просто удобная обертка для работы с CallBack функциями

// Код закоментировал, иначе все ломается

// let getRequest = (url) => {
//   return new Promise = ((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === 4) {
//         if (xhr.status !== 200) {
//           reject("Error");
//         } else {
//           resolve(xhr.responseText);
//         }
//       }
//     };
//     xhr.send();
//   })
// };

class ProductList {
  constructor(container = ".products") {
    this._container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];

    this.getProducts().then((data) => {
      this._goods = data;
      this._render();
    });

    // this._fetchGoods(); // DONT TOUCH PLZ
    // this._render();
  }

  // _fetchGoods() {
  //   console.log('fetching data...')
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log('request complete');
  //     // console.log(data);
  //     this._goods = JSON.parse(data);
  //     this._render();
  //     console.log(this._goods);
  //   });
  // }

  sum() {
    return this._allProducts.reduce((sum, { price }) => sum + price, 0);
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  }

  _render() {
    console.log("rendering data...");
    for (const product of this._goods) {
      const productObject = new ProductItem(product);

      this._allProducts.push(productObject);
      this._container.insertAdjacentHTML(
        "beforeend",
        productObject.getHTMLString()
      );
    }
  }
}

class ProductItem {
                      
// new ProductList();
console.log(new ProductList());
