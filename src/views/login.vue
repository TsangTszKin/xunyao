<template lang="html">
  <div class="login">

    <mt-header title="登录">
      <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <section>
      <mt-field
       label="账号"
        placeholder="请输入账号"
        type = "text"
        v-model = "account"
        :readonly = '!toggle'
        :disableClear = '!toggle'
        ></mt-field>
      <mt-field
       label="密码"
       placeholder="请输入密码"
       type="password"
       v-model="password"
       :readonly='!toggle'
       :disableClear = '!toggle'
        ></mt-field>
      <p class="tip">Tip : 账号密码随便输</p>
    </section>
    <p style="    padding: 0 10%;">
<mt-button
     plain
     size="large"
     type="primary"
     @click="login"
     v-if='toggle'>登录</mt-button>
    <mt-button
     plain
     size="large"
     type="primary"
     @click="logout"
     v-else>退出登录</mt-button>
    </p>
    

  </div>
</template>

<script>
import { Header, Toast } from 'mint-ui';

export default {
  components: {
    'mt-header': Header
  },
  data() {
    return {
      account: '',
      password: '',
      toggle: !localStorage.token
    }
  },
  methods: {
    // 登录按钮
    login() {
      if (this.account !== "" && this.password !== "") {
        Toast('登录成功,存储token,跳转网页');
        this.toggle = false;
        this.$store.commit('CHANGE_TOKEN', 1);
      } else {
        Toast('账号密码不能为空');
      }

      setTimeout(() => {
        this.$router.replace({
          path: 'user'
        })
      }, 1000);
      // 登录成
    },

    //退出登录按钮
    logout() {
      Toast('退出登录成功,清除token');
      this.$store.commit('CHANGE_TOKEN', 0);
      this.toggle = true;
      this.account = '';
      this.password = '';

    }
  }
}

</script>

<style lang="less" scoped>
.login {
  > section {
    .tip {
      padding: 6vw 3vw;
      color: rgb(224, 145, 71);
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}
</style>
