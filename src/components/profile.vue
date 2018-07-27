<template>
    <div class="profile_wrap">
        <app-header></app-header>
        <form action="http://www.xriml.com/yqg/user.php?act=profile" method="post">
            <input type="file" name="user_img" id="">
            <input type="submit" value="提交">
        </form>
    </div>
</template>
<script>
import Header from '@/components/header';

export default({
  name: 'Profile',
  data() {
    return {
      title: '个人设置',
    };
  },
  components: {
    'app-header': Header,
  },
});
</script>
