"use strict";

class ProductList {
  constructor(container = ".products") {
    this._container = document.querySelector(container);
    this._goods = [];
    this._allProducts = [];

    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this._goods = [
      { id: 1, title: "Notebook", price: 20000 },
      { id: 2, title: "Mouse", price: 1500 },
      { id: 3, title: "Keyboard", price: 5000 },
      { id: 4, title: "Gamepad", price: 4500 },
    ];
  }

  /*
  Суммарная стоимость всех товаров задание 2
  */
  calcSumAllProducts() {
    // v1 - производительнее ?
    // let res = 0;
    // for (const key of this._goods) {
    //   res += key.price;
    // }
    // return res;

    // v2
    return Object.values(this._goods).reduce(
      (acc, product) => acc + product.price,
      0
    );
  }

  _render() {
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
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const c = new ProductList();

class Cart {
  // класс корзины
  /*
  Функция Рендер корзины 
  Подсчет итоговой суммы корзины
  Добавление и удаление товара
  Отправка данных на бекэнд

  */
}
console.log(c.calcSumAllProducts());
console.log("Суммарная стоимость всех товаров: " + c.calcSumAllProducts());
