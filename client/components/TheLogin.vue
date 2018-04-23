<template>
  <form :class="$style.form" @submit="doSubmit">
    <h1>
      <span>Login</span>
      <span :class="$style.error" v-show="errorMsg">{{errorMsg}}</span>
    </h1>
    <input
      type="text"
      placeholder="username"
      v-model="username"
    >
    <input
      type="password"
      placeholder="password"
      v-model="password"
      autocomplete="new-password"
    >
    <button type="submit">登录</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  metaInfo: {
    title: 'Login Page'
  },
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    doSubmit (e) {
      e.preventDefault()
      if (this.validate()) {
        this.login({
          username: this.username,
          password: this.password
        }).then(_ => {
          this.$router.replace('/app')
        })
      }
    },
    validate () {
      if (!this.username.trim()) {
        this.errorMsg = '姓名不能为空'
        return false
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空'
        return false
      }
      this.errorMsg = ''
      return true
    }
  }
}
</script>

<style lang="stylus" module>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 450px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;

  h1 {
    font-weight: 100;
    color: #3d3d3d;
  }

  input {
    padding: 0 10px;
    box-sizing: border-box;
    line-height: 30px;
    margin-bottom: 20px;
    border: 1px solid #aaa;
    width: 100%;
    border-radius: 0;
    box-shadow: 0 0 0;
  }

  button {
    width: 100%;
    line-height: 30px;
    text-align: center;
    background-color: #0d60c7;
    color: #eaeaea;
    cursor: pointer;
    border-color: #0d60c7;
    transition: all 0.3s;

    &:hover {
      color: #fff;
      background-color: darken(#0d60c7, 10);
    }
  }
}

.error {
  font-size: 12px;
  color: red;
}

@media screen and (max-width: 600px) {
  .form {
    width: 90%;
  }

  .form input {
    line-height: 40px;
  }
}
</style>
