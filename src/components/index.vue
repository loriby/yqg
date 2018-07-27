<template>
  <div id="index">
    <div class="idx_header dbox">
        <div class="idx_logo dflex">
            <img src="../../static/images/zlogo.png" alt="">
        </div>
        <router-link class="idx_head_img" to="">
            <img class="dflex" src="../../static/images/sousuo.png" alt="">
        </router-link>
        <router-link class="idx_head_img" to="">
            <img src="../../static/images/person_cen.png" alt="">
        </router-link>
    </div>
    <ul class="idx_nav dbox">
        <!-- <router-link class="dflex" to=""> -->
            <li class="dflex"  @click="showCate($event)" data-cate="all"><span class="nav_checked">全部</span></li>
        <!-- </router-link> -->
        <!-- <router-link class="dflex" to=""> -->
            <li class="dflex"  @click="showCate($event)" data-cate="girl">
                <router-link :to="{name: 'Cate',query: {id: 1}}">
                    <span>女装</span>
                </router-link>
            </li>
        <!-- </router-link> -->
        <!-- <router-link class="dflex" to=""> -->
            <li class="dflex"  @click="showCate($event)" data-cate="boy"><span>男装</span></li>
        <!-- </router-link> -->
        <!-- <router-link class="dflex" to=""> -->
            <li class="dflex"  @click="showCate($event)" data-cate="food"><span>美食</span></li>
        <!-- </router-link> -->
        <!-- <router-link class="dflex" to=""> -->
            <li class="dflex"  @click="showCate($event)" data-cate="shoe"><span>鞋品</span></li>
        <!-- </router-link> -->
    </ul>
    <div class="swiper-container" :style="{'width':imgBoxW+'px'}">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item, index) in bannerImgs" :key="index">
                <a :href="item.url">
                    <img :src="'http://xriml.com/data/upload/banner/'+item.content" alt="">
                </a>
            </li>
        </ul>
        <div class="swiper-scrollbar"></div>
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
            <ul id="idx_actscr" class="idx_actscr" :style="{'margin-top':txtTop+'px'}">
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
    <app-goods :cate="cate" v-on:bimgs="bimgs"></app-goods>
    <app-footer></app-footer>
  </div>
</template>
<style>
body{
    background: #ebeced;
}
</style>
<style scoped>
@import '../../static/css/index.css';
</style>

<script>
import Goods from '@/components/goods';
import Footer from '@/components/footer';
import Swiper from 'swiper'

const ww = window.innerWidth;

export default{
  name: 'Wrap',
  data() {
    return {
      mark: 0,
      imgArr: [
        '../../static/images/img1.jpg',
        '../../static/images/img2.jpg',
        '../../static/images/img3.jpg',
        '../../static/images/img4.jpg',
      ],
      imgBoxW: ww,
      imgWrapW: false,
      imgsLeft: 0,
      barW: false,
      barWL: false,
      startX: false,
      moveX: false,
      endX: false,
      clearInter: false,
      scolTxt: 0,
      txtTop: 0,
      cate: 'all',
      bannerImgs: '',
    };
  },
  components: {
    'app-goods': Goods,
    'app-footer': Footer,
  },
  mounted() {
    this.barW = this.imgArr.length * 20;
    this.barWL = -this.barW / 2;

    new Swiper('.swiper-container', {
        autoplay: 1000,
        loop: true,
        scrollbar: '.swiper-scrollbar',
    });
  },
  methods: {
    autoPlay: function () {
      this.mark++;

      if (this.mark === this.imgArr.length) {
        this.mark = 0;
      }

      this.imgsLeft = -this.mark * ww;
    },
    play: function () {
      this.imgWrapW = ww * this.imgArr.length;
      setInterval(this.autoPlay, 1000);
      setInterval(this.txtAuto, 1000);
    },
    startImgsL: function (ev) {
      const ve = ev || event;
      ve.preventDefault();
      this.clearInter = true;
      if (ve.touches.length === 1) {
        this.startX = ve.touches[0].clientX;
      }
    },
    moveImgsL: function (ev) {
      const ve = ev || event;
      ve.preventDefault();

      if (ve.touches.length === 1) {
        this.moveX = ve.touches[0].clientX;

        const slidingDistance = this.moveX - this.startX;
        this.imgsLeft += slidingDistance;
      }
    },
    txtAuto: function () {
      this.scolTxt++;

      if (this.scolTxt === 6) {
        this.scolTxt = 0;
      }

      this.txtTop = -this.scolTxt * 42;
    },
    showCate: function (e) {
        const cate = e.currentTarget.getAttribute('data-cate');

        this.cate = cate;
    },
    bimgs: function (imgs) {
        this.bannerImgs = imgs;
    },
  },
  created() {
    this.play();
    document.title = '首页';
  },
};

</script>

