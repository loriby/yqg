<template>
  <div class="goods_wrap">
    <app-header></app-header>
    <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" >
                <img :src="goodsImgs" alt="">
            </li>
        </ul>
        <div class="swiper-pagination"></div>
    </div>
    <div class="goods_module">
        <p class="goodsdetail__name"><span>{{shopType}}</span>{{goodsMsg.title}}</p>
        <p class="goods_info">{{goodsMsg.intro}}</p>
        <div class="goods_price">
            <i class="goods_price_symbol fl">￥</i>
            <span class="fl">{{goodsMsg.coupon_price}}</span>
            <span class="goods_price_prompt fl">券后价</span>
            <div class="goods_coupon fl">
                <span class="goods_coupon_icon fl">券</span>
                <span class="goods_coupon_val">￥{{goodsMsg.quan}}</span>
                <p class="clear"></p>
            </div>
            <p class="clear"></p>
        </div>
        <div class="goods_sales">销量：<span>{{goodsMsg.volume}}</span></div>
        <p class="clear"></p>
    </div>
    <div class="goods_footer dbox">
        <div class="goods_index">
            <router-link to="/">
                <img src="../../static/images/idx_index.png" alt="">
                <p>首页</p>
            </router-link>
        </div>
        <div class="goods_index" @click="addCart()">
            <img src="../../static/images/shopping_cart.png" alt="">
            <p>加入购物车</p>
        </div>
        <div @click="goBuy(goodsMsg.click_url)" class="goods_buy dflex">立即领券</div>
    </div>
  </div>
</template>
<style>
    @import "../../static/css/swiper-3.2.7.min.css";
</style>

<script>
import Axios from 'axios';
import Header from '@/components/header';
import Swiper from 'swiper';
import Qs from 'qs';

export default{
  name: 'GoodsDetail',
  data() {
    return {
      goodsMsg: '',
      goodsImgs: '',
      shopType: '天猫',
      title: '商品详情',
      share: true,
      goodsId: this.$route.params.id
    };
  },
  mounted() {
    const that = this;
    const goodsId = that.goodsId;

    Axios.post('http://xriml.com/yqg/goods.php?id='+goodsId)
      .then((res) => {
        const goodsData = res.data.data;

          that.goodsMsg = goodsData;
          that.goodsImgs = goodsData.pic_url;

          if (goodsData.shop_type === 'C') {
            that.shopType = '淘宝';
          }
      })
      .catch((err) => {
        alert(err);
      });
    
    // new Swiper('.swiper-container', {
    //     autoplay: 1000,
    //     loop: true,
    //     scrollbar: '.swiper-pagination',
    // });
  },
  methods: {
    goBuy: function(url) {
      location.href = url;
    },
    addCart: function () {
        const that = this;
        const postData = {
            gid: that.goodsId,
            gp: that.goodsMsg.coupon_price
        };

        Axios.post('http://xriml.com/yqg/cart.php?act=add', Qs.stringify(postData))
            .then((res) => {
                if(res.data.status === 'success'){
                    alert('添加成功！');
                }else{
                    alert('添加失败，请重新添加！');
                }
            })
            .catch((err) => {
                alert('添加失败，请重新添加！');
            })
    }
  },
  created() {
    document.title = '商品详情页';
  },
  components: {
    'app-header': Header,
  },
};
</script>
<style scoped>
body {
    background: #ebeced;
}

.goods_img {
    background: #fff;
    padding: 20px 0;
}

.goods_img img {
    width: 300px;
    height: auto;
    margin: 0 auto;
}

.goods_module {
    background: #fff;
    padding: 1px 10px 10px;
    border-top: 1px solid #f0f0f0;
}

.goodsdetail__name {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
}

.goodsdetail__name span {
    padding: 2px 4px;
    background: #f23030;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    margin-right: 3px;
}

.goods_info {
    font-size: 12px;
    color: #666;
    margin-top: 6px;
}

.goods_price {
    font-size: 24px;
    color: #f23030;
    margin-top: 6px;
}

.goods_price_symbol {
    font-size: 18px;
    font-style: normal;
    margin-top: 2px;
}

.goods_price_prompt {
    display: inline-block;
    font-size: 12px;
    color: #999;
    margin: 8px 0 0 6px;
}

.goods_coupon {
    border-left: 1px dotted #ff9950;
    display: inline-block;
    width: auto;
    height: 16px;
    margin: 8px 0 0 10px;
}

.goods_coupon_icon {
    width: 16px;
    height: 16px;
    font-size: 12px;
    text-align: center;
    line-height: 16px;
    color: #fff;
    background: #ff9950;
    display: inline-block;
}

.goods_coupon_val {
    float: left;
    font-size: 12px;
    height: 14px;
    border: 1px solid #ff9950;
    padding: 0 3px;
    line-height: 14px;
    display: block;
}

.goods_sales {
    font-size: 12px;
    color: #999;
    margin-top: 6px;
}

.goods_footer {
    width: 100%;
    height: 52px;
    border-top: 1px solid #f0f0f0;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #fff;
}

.goods_index {
    width: 20%;
    height: 52px;
}

.goods_index img {
    width: 20px;
    height: auto;
    margin: 0 auto;
    margin-top: 6px;
}

.goods_index p {
    font-size: 14px;
    color: #333;
    text-align: center;
    margin-top: 3px;
}

.goods_buy {
    text-align: center;
    line-height: 52px;
    color: #fff;
    font-size: 14px;
    color: #fff;
    background: #f23030;
}
</style>
