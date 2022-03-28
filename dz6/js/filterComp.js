Vue.component("myfilter", {
  data() {
    return {
      userSearch: "",
      // prodLINK: this.$root.$refs,
      // не смог сделать по своему
      // думал всю логику оставить в компоненте, не получилось!
      // перенести сюда метод filter и через ссылки обращаяться к компоненту ->
      // prodComp
      //
      // у меня вопрос, можно это было сделать ?

      /*
      пути до массивов из отладчика VUE 
        //   "prodLINK.products.data.filtered"
        //   "prodLINK.products.data.products"
      */
    };
  },
  /*
  methods: {
    filter(value) {
      let regexp = new RegExp(this.userSearch, "i");
      this.prodLINK.filtered = this.prodLINK.products.filter((el) =>
        regexp.test(el.product_name)
      );
    },
  },

  */
  template: `
    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
            `,
  created() {
    // console.log("filter", this);
  },
});
