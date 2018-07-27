<template>
  <div class="login_wrap">
      <app-header ref="one"></app-header>
      <div class="login_box">
        <div class="user_log_prompt">
            <span>猪易网会员可直接登录</span>
            <ul>
                <li>
                    <router-link to="/register">立即注册&gt;&gt;</router-link>
                </li>
            </ul>
        </div>
      </div>
      <form action="">
          <div class="lw_box">
              <div class="login_ipt">
                  <input placeholder="请输入用户名/手机号" type="text" v-model="uname">
                  <img src="../../static/images/user_user.png" alt="">
              </div>
              <div class="login_ipt">
                  <input placeholder="请输入密码" type="password" v-model="upwd"/>
                  <img src="../../static/images/user_pwd.png" alt="">
              </div>
              <div class="login_forget">
                  <div class="login_remeber">
                      <input type="checkbox" name="" id="remeber">
                      <label for="remeber">一个月内免登录</label>
                      <p class="clear"></p>
                  </div>
                  <p class="login_find">忘记密码</p>
                  <p class="clear"></p>
              </div>
              <input type="button" @click="login" name="submit" value="立即登录" class="user_regi_log">
          </div>
      </form>
      <div class="lw_cooperation">
        <p class="t user_regi_cooper_top" style="">
            <b style=""></b>
            <span style="">其他登录方式</span>
        </p>
        <p class="qq_login">
            <a style="margin: 0;" href="http://www.zhue.cn/api/qqconnect/interface.php">
                <img class="user_regi_qqicn" style="" src="../../static/images/qq_login.png">
                <span class="user_regi_qqtxt" style="">QQ登录</span>
            </a>
        </p>
      </div>
  </div>
</template>
<script>
import Header from '@/components/header';
import Axios from 'axios';
import Qs from 'qs';

export default({
  name: 'Login',
  data() {
    return {
      title: '登录',
      share: false,
      uname: '',
      upwd: '',
    };
  },
  components: {
    'app-header': Header,
  },
  methods: {
    login: function () {
      const postData = {
        uname: this.uname,
        upwd: this.upwd,
      };
      const that = this;

      Axios.post('http://www.xriml.com/yqg/login.php?act=login', Qs.stringify(postData))
        .then((res) => {
          if (res.data.status === 1) {
            that.uname = '';
            that.upwd = '';
            alert(res.data);
          } else if (res.data.status === 2) {
            that.upwd = '';
            alert(res.data.msg);
          } else if (res.data.status === 3) {
            alert(res.data.msg);
            that.$router.push({ path: '/' });
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});

</script>
<style>
    body{
        background: #e3e4e6;
    }
    .login_box {
        margin: 10px;
    }
    .user_log_prompt span{
        color: #686868;
        font-size: 14px;
    }
    .user_log_prompt ul{
        float:right;
    }
    .user_log_prompt a{
        font-size: 14px;
        color: #000;
    }
    .lw_box{
        margin: 0 14px;
    }
    .login_ipt{
        width: 100%;
        height: 44px;
        position: relative;
        margin-top: 10px;
    }
    .login_ipt input{
        width: 100%;
        height: 100%;
        background: #fff;
        border: 1px solid #999;
        text-indent: 30px;
    }
    .login_ipt img{
        position: absolute;
        top: 13px;
        left: 9px;
        width: 15px;
        height: auto;
    }
    .login_forget{
        margin-top: 10px;
    }
    .login_remeber{
        float: left;
        color: #333;
    }
    .login_remeber input{
        width: 14px;
        height: 14px;
        float: left;
        margin: 3px 5px 0 0;
    }
    .login_remeber label{
        font-size: 14px;
    }
    .login_find{
        float: right;
        font-size: 14px;
    }
    .user_regi_log{
        color: #fff;
        border: 0;
        height: 44px;
        line-height: 44px;
        display: block;
        -webkit-user-select: none;
        appearance: none;
        font-size: 0.9rem;
        text-align: center;
        background: #f2434a;
        border-radius: 5px;
        width: 100%;
        margin-top: 20px;
    }
    .lw_cooperation{
        margin: 20px 14px 0;
    }
    .lw_cooperation .user_regi_cooper_top{
        text-decoration: line-through;
        position: relative;
        text-align: center;
    }
    .lw_cooperation .user_regi_cooper_top b{
        position: absolute;
        top: 9px;left: 0;
        width: 100%;
        height: 1px ;
        background: #c9c9c9;
        z-index: -1;
    }
    .lw_cooperation .user_regi_cooper_top span{
        display: inline-block;
        color: #686868;
        z-index: 1;
        background: #e3e4e6;
        padding: 0 8px;
        font-size: 12px;
    }
    .qq_login{
        width: 50px;
        margin: 0 auto;
        margin-top: 20px;
    }
    .user_regi_qqicn {
        width: 40px;
        height: auto;
        display: block;
        margin: 0 auto;
    }
    .user_regi_qqtxt{
        font-size: 12px;
        text-align: center;
        display: block
    }
</style>
