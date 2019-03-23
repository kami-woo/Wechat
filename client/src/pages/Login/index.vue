<template>
  <div class="login-wrap">
    <div class="loginCard">
      <Tabs class="loginTabs">
        <TabPane label="登陆" class="tabpane">
          <div>
            账号：<Input prefix="ios-contact" v-model="user_account" placeholder="Enter account" style="width: auto" />
          </div>
          <div class='item-wrap'>
            密码：<Input prefix="ios-contact" v-model="user_password" placeholder="Enter password" style="width: auto" />
          </div>
          <Button class="btn-login" type="primary" @click="handleLogin(true)">登陆</Button>
        </TabPane>
        <TabPane label="注册" class="tabpane">
          <div>
            用户名：<Input prefix="ios-contact" v-model="user_name" placeholder="Enter username" style="width: auto" />
          </div>
          <div>
            账号：<Input prefix="ios-contact" v-model="user_account" placeholder="Enter account" style="width: auto" />
          </div>
          <div>
            密码：<Input prefix="ios-contact" v-model="user_password" placeholder="Enter password" style="width: auto" />
          </div>
          <Button class="btn-login" type="primary" @click="handleLogin(false)">注册</Button>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      user_name: '',
      user_account: '',
      user_password: ''
    }
  },
  methods: {
    handleLogin(isRegister) {
      axios.post('/api/login', {
        user_name: this.user_name,
        user_account: this.user_account,
        user_password: this.user_password,
        isRegister
      }).then((res) => {
        if(isRegister) {
          if(res.data.success) {
            this.userMessage(res.data.userMessage)
            this.$router.push('/home')
            this.$socket.emit('client_id', res.data.userMessage.id)
          }
          else {
            alert('账号或密码错误')
          }
        }
        else {
          if(res.data.success) {
            alert('注册成功')
          }
          else alert('注册失败，账号重复')
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    ...mapMutations(['userMessage'])
  }
}
</script>

<style lang="less">
  .login-wrap {
    position: relative;
    height: 100%;

    .loginCard {
      opacity: .93;
      position: absolute;
      top: 50%;
      left: 70%;
      border: 1px solid #ccc;
      padding: 20px;
      width: 300px;
      border-radius: 10px;
      background-color: #eee;

      .loginTabs {
        display: flex;
        flex-direction: column;
        align-items: center;

        .ivu-tabs-nav {
          margin-top: 10px;
        }

        .tabpane {
          margin-top: 10px;
          text-align: center;

          div {
            text-align: right;
            margin-right: 5px;
            margin-top: 5px;
          }

          .btn-login {
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
