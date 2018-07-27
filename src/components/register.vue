<template>
  <div class="register_wrap">
      <app-header></app-header>
      <div class="login_box">
        <div class="user_log_prompt">
            <span>已有会员？</span>
            <ul>
                <li>
                    <router-link to="/login">立即登录&gt;&gt;</router-link>
                </li>
            </ul>
        </div>
        <div class="register_msg">
            <div class="rm_ipt">
                <input name="this." v-model="uname" placeholder="请输入用户名" type="text">
            </div>
            <div class="rm_ipt">
                <input name="upwd" v-model="upwd" placeholder="请输入密码" type="password">
            </div>
            <div class="rm_ipt">
                <input name="apwd" v-model="apwd" placeholder="请确认密码" type="password">
            </div>
            <input type="button" name="submit" value="立即注册" class="user_regi_log" @click="subMsg">
        </div>
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
  </div>
</template>
<script>
import Axios from 'axios';
import Qs from 'qs';
import Header from '@/components/header';

export default({
  name: 'Register',
  data() {
    return {
      title: '注册',
      share: false,
      uname: '',
      upwd: '',
      apwd: '',
      address: '',
      district: '',
    };
  },
  components: {
    'app-header': Header,
  },
  methods: {
    subMsg: () => {
      let promptMsg = '';
      const propsData = {
        uname: this.uname,
        upwd: this.upwd,
        address: this.address,
        district: this.district,
      };

      if (this.uname === '') {
        promptMsg = '用户名不能为空！';
      } else if (this.upwd === '') {
        promptMsg = '密码不能为空！';
      } else if (this.apwd === '') {
        promptMsg = '确认密码框不能为空！';
      } else if (this.upwd !== this.apwd) {
        promptMsg = '两次密码输入不一致，请重新输入';
      }

      if (promptMsg !== '') {
        alert(promptMsg);
        return;
      }
      const that = this;
      Axios.post('http://www.xriml.com/yqg/login.php?act=register', Qs.stringify(propsData))
        .then((res) => {
          if (res) {
            that.$router.push({ path: '/login' });
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
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
    .register_msg{
        margin: 20px 4px 0;
    }
    .rm_ipt{
        width: 100%;
        height: 44px;
        margin-bottom: 10px;
    }
    .rm_ipt input{
        width: 100%;
        height: 100%;
        border: 1px solid #ddd;
        text-indent: 10px;
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
        margin: 20px 4px 0;
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
