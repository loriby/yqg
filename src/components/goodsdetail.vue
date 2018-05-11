<template>
  <div class="goods_wrap">
    <app-header></app-header>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <img class="swiper-slide" :src="goodsImgs" alt=""/>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="goods_module">
        <p class="goods_name"><span>{{shopType}}</span>{{goodsMsg.title}}</p>
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
        <div class="goods_sales">销量：<span>{{goodsMsg.likes}}</span></div>
    </div>
    <div class="goods_footer dbox">
        <div class="goods_index">
            <router-link to="/">
                <img src="../../static/images/idx_index.png" alt="">
                <p>首页</p>
            </router-link>
        </div>
        <div @click="goBuy(goodsMsg.click_url)" class="goods_buy dflex">立即领券</div>
    </div>
  </div>
</template>
<script>
    import SwiperStyle from '../../static/css/swiper-3.2.7.min.css';  
    import Jquery from '../../static/js/jquery-1.8.0';
    import Swiper from '../../static/js/swiper-3.2.7.jquery.min';
    import Header from '@/components/header.vue';
    var goodsData = [];

    $.ajax({
        url:'../../static/json/json.json',
        dataType:'json',
        type:'get',
        async:false,
        success:function(res){
            goodsData = res;
        }
    })
    window.onload = function(){
        var mySwiper = new Swiper('.swiper-container', {
                        autoplay:2000,
                        direction:"horizontal",
                        loop:true,
                        pagination:".swiper-pagination",
                        paginationType : 'progress',
                    })
    }
    export default{
        name:'GoodsDetail',
        data(){
            return{
                goodsMsg:'',
                goodsImgs:'',
                shopType:'天猫',
                title:'商品详情',
                share:true
            }
        },
        mounted(){
            const localUrl = document.referrer;
            const goodsId = this.$route.params.id;
            for(let i = 0; i < goodsData.length; i++){
                 if(goodsData[i].id == goodsId){
                    this.goodsMsg = goodsData[i];
                    this.goodsImgs = goodsData[i].pic_url;

                    if(goodsData[i].shop_type == 'C'){
                        this.shopType = '淘宝';
                    }
                 }
            };
        },
        methods:{
            goBuy(url){
                location.href = url;
            }
        },
        created(){
            document.title = '商品详情页';
        },
        components:{
            'app-header':Header
        }
    }
</script>
<style>
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

.goods_name {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
}

.goods_name span {
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
    width: 40%;
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
