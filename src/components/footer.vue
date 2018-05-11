<template>
  <ul class="footer dbox">
      <li class="dflex">
          <router-link to="/">
            <img src="../../static/images/idx_index.png" alt="">
            <p>首页</p>
          </router-link>
      </li>
      <li class="dflex">
          <img src="../../static/images/shopping_cart.png" alt="">
          <p>购物车</p>
      </li>
      <li class="dflex">
          <router-link to="/user">
            <img src="../../static/images/personal_cen.png" alt="">
            <p>我的</p>
          </router-link>
      </li>
  </ul>
</template>
<script>
    export default{
        name:'Footer'
    }
</script>
<style>
    .footer{
        width: 100%;
        position: fixed;
        height: 54px;
        left: 0;
        bottom: 0;
        border-top: 1px solid #f0f0f0;
        background: #fff;
    }
    .footer li a{
        width: 100%;
        height: 100%;
        display: inline-block;
    }
    .footer li img{
        width: 24px;
        height: 24px;
        margin: 5px auto;
    }
    .footer li p{
        text-align: center;
        font-size: 14px;
        color: #333;
    }
</style>
