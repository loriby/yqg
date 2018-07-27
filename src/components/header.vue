<template>
    <div class="goods_tit_bar dbox">
        <img @click="back()" class="goods_back" src="../../static/images/arrow_l_g.png" alt="">
        <p class="goods_tit dflex">{{title}}</p>
        <img v-if="share" class="goods_share" src="../../static/images/share_g.png" alt="">
    </div>
</template>
<script>
export default({
  name: 'Header',
  data() {
    return {
      title: '',
      share: false,
    };
  },
  methods: {
    back() {
      const reg = /localhost/g;
      const localUrl = document.referrer;

      if (reg.test(localUrl)) {
        this.$router.go(-1);
      } else {
        window.location.href = '/';
      }
    },
  },
  mounted() {
    this.title = this.$parent.title;
    this.share = this.$parent.share;
  },
});
</script>
<style>
.goods_tit_bar {
    width: 100%;
    height: 44px;
    background: #fff;
    border-bottom: 1px solid #ebeced;
}

.goods_back {
    height: 18px;
    width: auto;
    padding: 13px 10px;
}

.goods_tit {
    text-align: center;
    line-height: 44px;
    color: #333;
    font-size: 14px;
    margin-left: -30px;
}

.goods_share {
    height: 22px;
    width: auto;
    padding: 11px 10px;
}
</style>
