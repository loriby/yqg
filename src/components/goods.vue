<template>
    <div class="goods_wrap">
        <div class="goods" id="goods" >
            <div class="goods_list" v-for="item in goodsData" :key="item.id">
                <router-link :to="{name:'Detail',params:{id:item.id}}">
                    <img class="img1" :src="item.pic_url" alt="">
                    <!-- <span>{{item.shop_type == 'C' ? '淘宝' : '天猫'}}</span> -->
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
</template>
<script>
import Vue from 'vue';
import Axios from 'axios';
import Qs from 'qs';
import Router from 'vue-router';

let idx = 1;

Vue.use(Router);

export default{
  name: 'Goods',
  data() {
    return {
      goodsData: '',
      shopType: '',
      pagesIdx: 0,
      loadimg: false,
      bannerimgs: '',
    };
  },
  props:['cate'],
  methods: {
    getData: function () {
      const that = this;
      const postData = {
        pagesIdx: idx,
      };
      
      that.loadimg = true;

      Axios.post('http://xriml.com/yqg/index.php', Qs.stringify(postData))
        .then((res) => {
          that.goodsData = res.data.data.goods_list;
          that.bannerimgs = res.data.data.banner;
          that.loadimg = false;
          
          if(idx == 1){
            this.$emit('bimgs', this.bannerimgs);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    getMore: function () {
      const scrolTop = document.documentElement.scrollTop || document.body.scrolTop;
      const sH = document.documentElement.clientHeight;
      const wH = document.body.offsetHeight;

      if (scrolTop === wH - sH && this.loadimg === false) {
        idx += 1;
        this.getData();
      }
    },
  },
  mounted() {
    if(this.goodsData === ''){
      this.getData();
    }
    window.addEventListener('scroll', this.getMore);
  },
};
</script>
<style scoped>
@import '../../static/css/goods.css';
</style>
