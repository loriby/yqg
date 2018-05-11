<template>
  <div id="index">
    <div class="idx_header dbox">
        <div class="idx_logo dflex">
            <img src="../../static/images/zlogo.png" alt="">
        </div>
        <router-link class="idx_head_img" to=""><img class="dflex" src="../../static/images/sousuo.png" alt=""></router-link>
        <router-link class="idx_head_img" to=""><img src="../../static/images/person_cen.png" alt=""></router-link>
    </div>
    <ul class="idx_nav dbox">
        <router-link class="dflex" to="">
            <li><span class="nav_checked">精选</span></li>
        </router-link>
        <router-link class="dflex" to="">
            <li><span>兽药</span></li>
        </router-link>
        <router-link class="dflex" to="">
            <li><span>饲料</span></li>
        </router-link>
        <router-link class="dflex" to="">
            <li><span>添加剂</span></li>
        </router-link>
        <router-link class="dflex" to="">
            <li><span>设备</span></li>
        </router-link>
    </ul>
    <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(img, index) in imgArr" :key="index">
                    <img :src="img" alt="">
            </li>
        </ul>
        <div class="swiper-pagination"></div>
    </div>
    <div class="shop_nav">
        <router-link to="">
            <div>
                <img src="../../static/images/1513128304517691182.png" alt="">
                <p>每日特价</p>
            </div>
        </router-link>
        <router-link to="">
            <div>
                <img src="../../static/images/1513128322029649340.png" alt="">
                <p>积分商城</p>
            </div>
        </router-link>
        <router-link to="">
            <div>
                <img src="../../static/images/1514152633004587465.png" alt="">
                <p>精选商品</p>
            </div>
        </router-link>
        <router-link to="">
            <div>
                <img src="../../static/images/zhuepf.png" alt="">
                <p>批发区</p>
            </div>
        </router-link>
        <p class="clear"></p>
    </div>
    <div class="idx_activity" style="padding-top: 2px;">
        <img src="../../static/images/idx_ad_r1_c1.png" alt="">
        <div style="background: #fff;">
            <ul id="idx_actscr" :style="{'margin-top':txtTop+'px',transition:'margin-top 0.5s ease'}">
                <router-link to="">
                    <li>123456</li>
                </router-link>
                <router-link to="">
                    <li>223456</li>
                </router-link>
                <router-link to="">
                    <li>323456</li>
                </router-link>
                <router-link to="">
                    <li>423456</li>
                </router-link>
                <router-link to="">
                    <li>523456</li>
                </router-link>
                <router-link to="">
                    <li>623456</li>
                </router-link>
            </ul>
        </div>
    </div>
    <div class="title">
        <img class="img1" src="../../static/images/midx_tit_img_r17_c1.jpg" alt="">
        <router-link class="more" to="">更多</router-link>
    </div>
    <app-goods></app-goods>
    <app-footer></app-footer>
  </div>
</template>
<script>
    var ww = window.innerWidth;
    import Goods from '@/components/goods.vue';
    import Footer from '@/components/footer.vue';
    import SwiperStyle from '../../static/css/swiper-3.2.7.min.css';  
    import Jquery from '../../static/js/jquery-1.8.0';
    import Swiper from '../../static/js/swiper-3.2.7.jquery.min';

    window.onload = function(){
        var mySwiper = new Swiper('.swiper-container', {
                        autoplay:2000,
                        direction:"horizontal",
                        loop:true,
                        pagination:".swiper-pagination",
                        autoplayDisableOnInteraction:false,
                        pagination : '.swiper-pagination',
                        paginationClickable :true
                    })
    }

    export default{
        name:'Wrap',
        data(){
            return{
                mark:0,
                imgArr:[
                    '../../static/images/img1.jpg',
                    '../../static/images/img2.jpg',
                    '../../static/images/img3.jpg',
                    '../../static/images/img4.jpg'
                ],
                imgBoxW:ww,
                imgWrapW:false,
                imgsLeft:0,
                barW:false,
                barWL:false,
                startX:false,
                moveX:false,
                endX:false,
                clearInter:false,
                scolTxt:0,
                txtTop:0
            }
        },
        components:{
            'app-goods':Goods,
            'app-footer':Footer
        },
        mounted(){
            this.barW = this.imgArr.length*20;
            this.barWL = -this.barW/2;
        },
        methods:{
            autoPlay(){
                this.mark++;
                
                if(this.mark == this.imgArr.length){
                    this.mark = 0;
                }
                
                this.imgsLeft = -this.mark*ww;
            },
            play(){
                this.imgWrapW = ww*this.imgArr.length;
                var scolImg = setInterval(this.autoPlay,1000);
                var scolT = setInterval(this.txtAuto,1000);
            },
            change(){
                //this.mark = this.imgArr.length-3;
            },
            startImgsL(ev){
                ev = ev || event;
                ev.preventDefault();
                this.clearInter = true;
                if(ev.touches.length == 1){
                    this.startX = ev.touches[0].clientX;
                }
                
            },
            moveImgsL(ev){
                ev = ev || event;
                ev.preventDefault();

                if(ev.touches.length == 1){
                    this.moveX = ev.touches[0].clientX;

                    var slidingDistance = this.moveX - this.startX;
                    this.imgsLeft += slidingDistance;
                }
            },
            txtAuto(){
                this.scolTxt++;

                if(this.scolTxt == 6){
                    this.scolTxt = 0;
                }
                
                this.txtTop = -this.scolTxt*42;
            }
        },
        created(){
            this.play();
            document.title = '首页';
        }
    }

    
</script>
<style>
    body{
        background: #ebeced;
    }
    .idx_header{
        width: 100%;
        height: 44px;
        background: #f23030;
    }
    .idx_logo img{
        width: 112px;
        height: auto;
        margin: 13px 0 0 10px;
    }
    .idx_head_img{
        display: block;
    }
    .idx_head_img img{
        width: 24px;
        height: 24px;
        margin: 10px 10px 0 0;
    }
    .idx_nav{
        width: 100%;
        height: 41px;
        background: #fff;
    }
    .idx_nav li{
        text-align: center;
        line-height: 40px;
    }
    .idx_nav li span{
        display: inline-block;
        height: 40px;
        color: #333;
    }
    .idx_nav li span.nav_checked{
        color: #f23030;
        border-bottom: 1px solid #f23030;
    }
    .slide{
        overflow: hidden;
        height: auto;
        position: relative;
    }
    .slide_show{
        width: 100%;
        height: auto;
    }
    .slide_show li{
        float: left;
    }
    .slide_show li img{
        width: 100%;
    }
    .slide_bar{
        width: 100px;
        position: absolute;
        bottom: 10px;
        left: 50%;
        margin-left: -50px;
    }
    .slide_bar span{
        display: block;
        width: 10px;
        height: 10px;
        background: #fff;
        border-radius: 5px;
        float: left;
        margin: 0 5px;
    }
    .slide_bar span.active{
        background: #007aff;
    }
    /* .images-enter-active{
        transform: translateX(0);
        transition: all 0.5s ease-in-out;
        transition: 'margin-left 0.5s linear';
    }
    .images-leave-active{
        transform: translateX(-100%);
        transition: all 0.5s ease-in-out;
        transition: 'margin-left 0.5s linear';
    } */
    /* .images-enter{
        transform: translateX(100%);
        transition: all 0.5s ease-in-out;
        transition: margin-left 0.5s linear;
    }
    .images-leave{
        transform: translateX(0);
        transition: all 0.5s ease-in-out;
        transition: margin-left 0.5s linear;
    } */
    .shop_nav{
        width: 100%;
        background: #fff;
    }
    .shop_nav div{
        float: left;
        width: 25%;
        padding-bottom: 10px;
    }
    .shop_nav img{
        width: 50%;
        height: auto;
        margin: 10px 25% 0;
    }
    .shop_nav p{
        text-align: center;
        font-size: 14px;
        color: #333;
        margin-top: 5px;
    }
    .title{
        margin: 10px 0 5px;
        position: relative;
    }
    .idx_activity{
	height: 42px;
	width: 100%;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-box;
	display: -o-box;
	display: box;
	overflow: hidden;
	padding-top: 8px;
	background: #fff;
	border-top: 1px solid #f0f0f0;
	margin-bottom: 8px;
	}
.idx_activity img{
	width: 78px;
	height: 18px;
	margin-top: 7px;
	padding: 5px 15px;
	border-right: 1px solid #e8e8e8;
	}
.idx_activity div{
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	-ms-box-flex: 1;
	-o-box-flex: 1;
	box-flex: 1;
	overflow: hidden;
	}
.idx_activity ul li{
	width: 90%;
	padding: 0 5%;
	height: 42px;
	line-height: 42px;
	font-size: 14px;
	color: #333333;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
    }
    .more{
        position: absolute;
        height: 40px;
        line-height: 40px;
        top: 50%;
        margin-top: -20px;
        right: 10px;
        background: url(../../static/images/idx_more.png) no-repeat;
        background-size: 30% auto;
        background-position: right center;
        display: block;
        font-size: 12px;
        padding-right: 15px;
    }
    .goods{
        width: 100%;
        height: auto;
    }
    .goods_list{
        width: 47.75%;
        float: left;
        background: #fff;
        margin: 0 0 5px 1.5%;
        padding-bottom: 10px;
    }
    .goods_name{
        margin: 10px 10px 0;
        font-size: 14px;
        color: #333;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .goods_name span{
        padding: 2px 4px;
        background: #f23030;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 3px;
    }
    .goods_msg{
        margin: 5px 10px 0;
        height: 24px;
        line-height: 24px;
    }
    .goods_price{
        font-size: 18px;
        color: #f23030;
        float: left;
    }
    .goods_sales{
        font-size: 12px;
        color: #999;
        float: right;
    }
</style>
