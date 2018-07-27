<template>
  <div class="cart_wrap">
    <app-header></app-header>
    <!-- <div class="flw_heat">
      <div class="flow_goods_check flow_shop_check">
        <img src="../../static/images/checked.png" alt="">
        <input type="checkbox"class="sup_checkbox">
      </div>
      <a href="search.php?suppliers_id=68">
        <p>安琪酵母</p>
      </a>
    </div>
    <div class="flw_mz" style="height: 36px;">
        <span>满赠</span>
        <p>本店满10件, 赠【畅消】4%中猪预混料 集团核心料厂 涨势快 肉质好×2</p>         
        <img onclick="showMsg(this)" src="../../static/images/flow_m_zk.png" alt="">
    </div> -->
    <ul class="itemlist flow_goods_list" style="" id="suppliers_check_id68">
      <li class="cart_goods_list" v-for="item in goodsMsg" :key="item.goods_id">
        <div class="flo_lid">
          <div class="flow_goods_check">
            <img src="../../static/images/unchecked.png" alt="" ref="checkedImg">
            <input type="checkbox" :data-name="item.goods_id" :data-price="item.goods_price1" class="cart_checkbox" @click="changeSelect()" ref="checkboxIpt">
          </div>
          <div class="itemlist_l"> 
            <router-link :to="{name:'Detail',params:{id:item.goods_id}}">
              <img class="lazy" :src="item.goods_img" border="0" :title="item.goods_name"> 
            </router-link> 
          </div>
          <div class="desc"> 
            <router-link :to="{name:'Detail',params:{id:item.goods_id}}">
              <h4 class="goods_name">{{item.goods_name}}</h4>
            </router-link>
            <div class="clear"> </div>
            <p class="cart_goods_speci">{{item.goods_intro}}</p>
            <div class="b"> 
              <em class="price">￥{{item.goods_price1}}</em>
              <span style="width:98px;float:right;margin-right:10px;text-align:right;" class="txt"> 
                <input type="hidden" id="min_number_1571093" value="0">
                <p class="subcount flow_cou_sub" @click="subCount(item.goods_id)"></p>
                <input style="" class="inputBg flow_cou_txt" type="text" :value="item.goods_count" size="4" onchange="document.getElementById('updatecart').click()">
                <p class="addcount flow_cou_add" @click="addCount(item.goods_id)"></p>
              </span>  
            </div>
          </div>
        </div>
        <p class="flow_mz_confirm" @click="deleteGoods(item.goods_id)"></p>
      </li>
    </ul>
    <p class="notGoods" v-if="isHave === 'none'">购物车里什么都没有，<router-link to="/">去购物>></router-link></p>
    <footer class="toolbar" v-if="isHave != 'none'">
      <div class="flow_goods_check flow_all_check">
        <img ref="selectAllImg" src="../../static/images/unchecked.png" alt="">
        <input ref="selectAllIpt" @click="selectAll()" type="checkbox">
      </div>
      <p class="flow_cart_comb">合计: <em class="price" id="goods_subtotal">￥15.90</em></p>
      <a style="" class="flow_cart_acc" href="javascript:void(0)" onclick="sub_checkout()">去结算(<em class="num" id="total_number">5</em>)</a> 
    </footer>
  </div>
</template>
<script>
import Header from "@/components/header";
import Axios from "axios";
import Qs from "qs";

export default {
  name: "GoodsCart",
  data() {
    return {
      title: "购物车",
      goodsMsg: '',
      isHave: '',
    };
  },
  components: {
    "app-header": Header,
  },
  mounted() {
    document.title = "购物车";
    this.getGoodsList();
  },
  methods:{
    deleteGoods: function (id) {  //删除购物车商品
      const that = this;
      if(confirm('你确定要把该商品移出购物车吗') === true){
        Axios.post('http://xriml.com/yqg/cart.php?act=remove&id='+id)
          .then((res) => {
            that.getGoodsList();
            alert('移出成功！');
          })
          .catch((err) => {
            alert('移出失败，请重试！');
          })
      }
    },
    getGoodsList: function () {   //获取购物车商品列表
      const that = this;

      Axios.post('http://xriml.com/yqg/cart.php?act=list')
        .then((res) => {
            that.goodsMsg = res.data.msg;
            that.isHave = res.data.status;
        })
        .catch((err) => {
            console.log(err)
        })
    },
    changeSelect: function (v) {   //单个商品选中/取消选中
      const img = event.path[1].children[0];
      const select = event.target.checked;

      if(select === true){
        let flag = false;
        img.setAttribute('src','../../static/images/checked.png');

        for(let i = 0; i < this.$refs.checkboxIpt.length; i++){
          if(this.$refs.checkboxIpt[i].checked === false){
            flag = true;
          }
        }

        if(flag === false){
          this.$refs.selectAllIpt.checked = true;
          this.$refs.selectAllImg.setAttribute('src','../../static/images/checked.png');
        }

      }else{
        img.setAttribute('src','../../static/images/unchecked.png');

        if(this.$refs.selectAllIpt.checked === true){
          this.$refs.selectAllIpt.checked = false;
          this.$refs.selectAllImg.setAttribute('src','../../static/images/unchecked.png');
        }

      }

      this.calculateVal();
    },
    selectAll: function () {  //全选/取消全选
      const img = event.path[1].children[0];

      if(event.target.checked === true){
        img.setAttribute('src','../../static/images/checked.png');

        for(let i = 0; i < this.$refs.checkboxIpt.length; i++){
          this.$refs.checkboxIpt[i].checked = true;
          this.$refs.checkedImg[i].setAttribute('src','../../static/images/checked.png');
        }

      }else{
        img.setAttribute('src','../../static/images/unchecked.png');

        for(let i = 0; i < this.$refs.checkboxIpt.length; i++){
          this.$refs.checkboxIpt[i].checked = false;
          this.$refs.checkedImg[i].setAttribute('src','../../static/images/unchecked.png');
        }

      }
    },
    calculateVal: function(){
      let arr = [];

      for(let i = 0; i < this.$refs.checkboxIpt.length; i++){
        if(this.$refs.checkboxIpt[i].checked === true){
          arr.push(this.$refs.checkboxIpt[i].price);
        }
      }

      //console.log(event.path[2].children[2].children[3].children[0].innerText)
    },
    addCount: function(){
      let val = Number(event.path[1].children[2].value);
      event.path[1].children[2].value = val+1;
    }
  }
};
</script>
<style>
body{
  background: #f9f9f9;
}
</style>

<style scoped>
@import '../../static/css/goods_cart.css';
</style>
