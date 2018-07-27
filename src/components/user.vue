<template>
  <div>
    <div class="user_wrap">
        <div class="user_head">
            <div class="user_msg">
                <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2428276186,2564519085&fm=27&gp=0.jpg" alt="" class="user_img">
                <div class="user_det_msg">
                    <p class="user_name">沈月</p>
                    <p class="user_level">初级会员</p>
                </div>
                <p class="clear"></p>
            </div>
            <p class="user_set">设置</p>
        </div>
    </div>
    <div class="my_order">
        <img src="../../static/images/user_username.png" alt="">
        <p>我的订单</p>
        <img class="clips_coupons" src="themes/zhue/images/price_right1.png" alt="">
    </div>
    <div class="vc_lj">
        <router-link to="/profile">
            <div>
                <img src="../../static/images/user_username.png" alt="">
                <h5 class="user_point"></h5>
                <p>账户管理</p>
                <img class="clips_coupons" src="../../static/images/price_right1.png" alt="">
                <span class="clips_wxps">完成实名认证奖励两百积分</span>
            </div>
        </router-link>
        <div>
            <img src="../../static/images/user_advice.png" alt="">
            <p>意见反馈</p>
            <img class="clips_coupons" src="../../static/images/price_right1.png" alt="">
        </div>
        <div class="user_exit" @click="exit">退出</div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<style>
    body{
        background: #f3f4f6;
    }
    .user_head{
        width: 100%;
        height: 200px;
        background: #000;
        position: relative;
    }
    .user_msg{
        padding: 70px 0 0 20px;
    }
    .user_img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border:3px solid rgba(255,255,255,.5);
        float: left;
    }
    .user_det_msg{
        float: left;
        margin-left: 10px;
    }
    .user_name{
        font-size: 18px;
        color: #fff;
        margin-top: 10px;
    }
    .user_level{
        margin-top: 6px;
        font-size: 12px;
        color: #fff;
    }
    .user_set{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 14px;
        color: #fff;
    }
    .my_order{
        width: 100%;
        line-height: 44px;
        height: 44px;
        font-size: 14px;
        background: #fff;
        position: relative;
    }
    .my_order img{
        float: left;
        height: auto;
        width: 20px;
        padding: 12px 14px 9px 8px;
    }
    .my_order img.clips_coupons{
        position: absolute;
        right: 0px;
        top: 1px;
        width: 8px;
        height: auto;
        display: none;
    }
    .vc_lj{
        width: 100%;
        background: #fff;
        border-top: 1px solid #e1e1e2;
        margin-top: 8px;
        overflow: hidden;
    }
    .vc_lj div{
        width: 100%;
        line-height: 39px;
        height: 39px;
        font-size: 14px;
        position: relative;
        color: #999;
        border-bottom: 1px solid #eee;
    }
    .vc_lj div img:nth-child(1){
        float: left;
        height: auto;
        width: 20px;
        height: auto;
        margin-top: 10px;
        padding: 0 10px;
    }
    .vc_lj p {
        font-size: 15px;
        line-height: 40px;
        float: left;
        color: #757575;
    }
    .user_exit{
        text-align: center;
        font-size: 12px;
        color: #f2434a;
    }
    .clips_wxps{
        float: right;
        display: inline-block;
        font-size: 12px;
        color: #f2434a;
        margin-right: 5px;
        line-height: 40px;
    }
    .vc_lj div img.clips_coupons{
        float: right;
        border: none;
        margin-top: 13px;
        width: 8px;
        margin-right: 10px;
    }
</style>

<script>
import Footer from '@/components/footer';
import Axios from 'axios';

export default({
  name: 'User',
  data() {
    return {
      title: '我的',
      share: false,
      usermsg: '',
    };
  },
  components: {
    'app-footer': Footer,
  },
  mounted() {
    const that = this;

    Axios.post('http://www.xriml.com/yqg/user.php')
      .then((res) => {
        that.usermsg = res;
      })
      .catch((err) => {
        alert(err);
      });
  },
  methods: {
    exit: function() {
      const that = this;
      Axios.post('http://www.xriml.com/yqg/login.php?act=exit')
        .then((res) => {
          if (res.data.status === 4) {
            console.log(res.data);
            //that.$router.push({ path:'/login' });
          } else {
            alert('error');
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});

</script>
