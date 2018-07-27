<template>
  <div class="cate_wrap">
    <app-header :titleText="title"></app-header>
    <div class="goods_wrap">
      <div class="goods">
        <div class="goods_list" v-for="item in goodsData">
          <router-link :to="{name:'Detail',params:{id:item.id}}">
            <img class="img1" :src="item.pic_url" :alt="item.title">
            <p class="goods_name">{{item.title}}</p>
            <p class="goods_intro">{{item.intro}}</p>
            <div class="goods_msg">
                <p class="goods_price">￥{{item.coupon_price}}</p>
                <p class="goods_sales">销量：{{item.volume}}</p>
                <p class="clear"></p>
            </div>
          </router-link>
        </div>
        <p class="clear"></p>
        <img class="load_img" v-if="loadimg === true" src="../../static/images/load.gif" alt="">
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import Header from "@/components/header";
  import Footer from "@/components/footer";
  import Axios from "axios";
  import Qs from "qs";

  export default{
    name: "cate",
    data(){
      return{
        title: '女装专场',
        cate_id: this.$route.query.id,
        page: 1,
        goodsData: '',
        loadimg: false,
      }
    },
    components:{
      "app-header": Header,
      "app-footer": Footer,
    },
    mounted() {
      
      if (this.cate_id == 1) {
        this.title = '女装专场';
      }

      this.getdata();
      window.addEventListener('scroll', this.getMore);
    },
    methods:{
      getdata () {
        const that = this;

        let postData = {
          id: that.cate_id,
          page: that.page,
        };

        that.loadimg = true;

        Axios.post('http://xriml.com/yqg/cate.php?act=list', Qs.stringify(postData))
        .then((res) => {
          that.goodsData = res.data.data;
          that.loadimg = false;
        })
        .catch((err) => {
          alert(err);
        })
      },
      getMore () {
        const scrolTop = document.documentElement.scrollTop || document.body.scrolTop;
        const sH = document.documentElement.clientHeight;
        const wH = document.body.offsetHeight;
        
        if (scrolTop === wH - sH && this.loadimg === false) {
          this.page += 1;
          this.getdata();
        }
      }
    },
  }
</script>
<style>
body{
  background: #f0f0f0;
}
</style>

<style scoped>
@import '../../static/css/goods.css';
</style>