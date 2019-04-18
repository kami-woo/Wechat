<template>
  <div class="login-wrap">
    <div class="loginCard">
      <Tabs class="loginTabs">
        <TabPane label="登陆" class="tabpane-login">
          <div>
            <Input size="large" prefix="ios-contact" v-model="user_account" placeholder="Enter account" style="width: auto" />
          </div>
          <div class='item-wrap'>
            <Input size="large" type="password" prefix="md-unlock" v-model="user_password" placeholder="Enter password" style="width: auto" />
          </div>
          <Button class="btn-login" type="primary" @click="handleLogin(true)">登陆</Button>
        </TabPane>
        <TabPane label="注册" class="tabpane">
          <div>
            用户名：<Input prefix="ios-ionitron" v-model="user_name" placeholder="Enter username" style="width: auto" />
          </div>
          <div>
            账号：<Input prefix="ios-contact" v-model="user_account" placeholder="Enter account" style="width: auto" />
          </div>
          <div>
            密码：<Input prefix="md-unlock" v-model="user_password" placeholder="Enter password" style="width: auto" />
          </div>
          <Button class="btn-login" type="primary" @click="handleLogin(false)">注册</Button>
        </TabPane>
      </Tabs>
    </div>
    <tip-card :showTip="showTip" :tipMsg="tipMsg" @hidden="handleHiddenCard"></tip-card>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
import tipCard from '../../common/tipCard.vue'
export default {
  name: 'login',
  data() {
    return {
      user_name: '',
      user_account: '',
      user_password: '',
      showTip: false,
      tipMsg: ''
    }
  },
  components: {
    tipCard
  },
  methods: {
    handleHiddenCard() {
      this.showTip = false
    },
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
            // alert('账号或密码错误')
            this.tipMsg = '账号或密码错误啦，重新检查一下吧~'
            this.showTip = true
          }
        }
        else {
          if(res.data.success) {
            this.tipMsg = '注册成功，赶紧登陆使用吧~'
            this.showTip = true
          }
          else {
            this.tipMsg = '账号重复啦，换个账号吧'
            this.showTip = true
          }
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
      opacity: .9;
      position: absolute;
      top: 50%;
      left: 70%;
      border: 1px solid #ccc;
      padding: 20px;
      width: 300px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: -2px 2px 10px #333;
      color: #000;

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

        .tabpane-login {
          margin-top: 10px;
          text-align: center;

          div {
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
