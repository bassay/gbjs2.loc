// подсмотрел, разобрался
Vue.component("cart", {
  data() {
    return {
      showCart: false,
      cartItems: [],
      cartUrl: "/getBasket.json",
      imgCart: "https://via.placeholder.com/50x100",
    };
  },
  methods: {
    addProduct(product) {
      this.$parent.getJson(`${API}/addToBasket.json`).then((data) => {
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
    remove(item) {
      this.$parent.getJson(`${API}/deleteFromBasket.json`).then((data) => {
        if (data.result === 1) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            this.cartItems.splice(this.cartItems.indexOf(item), 1);
          }
        }
      });
    },
  },
  created() {
    this.$parent.getJson(`${API + this.cartUrl}`).then((data) => {
      for (let el of data.contents) {
        this.cartItems.push(el);
      }
    });
  },
  template: `
    <div>
    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <cart-item ref="cart-item"
            v-for="item of cartItems"
            :key="item.id_product"
            :item="item"
            :img="imgCart"
            @remove="remove"
            ></cart-item>
        </div>
    </div>
  
  `,
  mounted() {
    // console.log("cart", this);
  },
});

Vue.component("cart-item", {
  props: ["item", "img"],
  template: `
<div class="cart-item">
  <div class="product-bio">
      <img :src="img" alt="Some image">
      <div class="product-desc">
          <p class="product-title">{{item.product_name}}</p>
          <p class="product-quantity">Количество: {{item.quantity}}</p>
          <p class="product-single-price">{{item.price}}₽ за единицу</p>
      </div>
  </div>
  <div class="right-block">
      <p class="product-price">{{ item.quantity * item.price }}₽</p>
      <button class="del-btn" @click="$emit('remove', item)">&times;</button>
  </div>
</div>
  `,
  // https://ru.vuejs.org/v2/api/#vm-emit
  // https://qna.habr.com/q/822325
  created() {
    // console.log("cart-item", this);
    // console.log("$emit", emit);
  },
});
