// подсмотрел, разобрался
Vue.component("products", {
  data() {
    return {
      catalogUrl: "/catalogData.json",
      products: [],
      filtered: [],
      imgCatalog: "https://via.placeholder.com/200x150",
    };
  },
  methods: {
    filter(value) {
      let regexp = new RegExp(value, "i");
      this.filtered = this.products.filter((el) =>
        regexp.test(el.product_name)
      );
    }, // end filter
  },
  created() {
    this.$parent.getJson(`${API + this.catalogUrl}`).then((data) => {
      for (let el of data) {
        this.products.push(el);
        this.filtered.push(el);
      }
    });
  },
  template: `
<div class="products">
  <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
</div>
  `,
  mounted() {
    // console.log("prod", this);
  },
});

Vue.component("product", {
  data() {
    return {
      // ссылка до cartComp
      cartAPI: this.$root.$refs.cart,
    };
  },
  props: ["product", "img"], // получаем данные из род. комп
  template: `
    <div class="product-item">
    <img :src="img" alt="Some img">
    <div class="desc">
        <h3>{{product.product_name}}</h3>
        <p>{{product.price}}₽</p>
        <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
    </div>
    </div>
  
  `,
});
