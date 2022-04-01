// 1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода. На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods. ++

// 2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины. ++

// 3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст. ++
const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const app = new Vue({
  el: "#app",
  data: {
    catalogUrl: "/catalogData.json",
    cartUrl: "/getBasket.json",
    products: [],
    imgCatalog: "https://via.placeholder.com/200x150",
    searchLine: "",
    isVisibleCart: false,
    filtresProd: [],
    cartItems: [],
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then((result) => result.json())
        .catch((error) => {
          console.log(error);
        });
    },
    // методы препода
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`).then((data) => {
        if (data.result === 1) {
          let find = this.cartItems.find(
            (el) => el.id_product === product.id_product
          );
          if (find) {
            find.quantity++;
          } else {
            let prod = Object.assign({ quantity: 1 }, product);
            this.cartItems.push(prod);
          }
        } else {
          alert("Error");
        }
      });
    },
    // методы препода
    remove(item) {
      this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        }
      });
    },
    filterGoods() {
      let regexp = new RegExp(this.searchLine, "i");
      this.filtresProd = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },
  computed: {},
  beforeCreated() {},
  created() {
    this.getJson(`${API + this.cartUrl}`).then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
    });
    console.log(this.cartItems);
    this.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
        this.filtresProd.push(el);
      }
    });
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});
