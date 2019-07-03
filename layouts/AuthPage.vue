<template>
  <el-container>
    <el-header 
      style="text-align: right; font-size: 12px">
      <el-dropdown
        @command="handleCommand">
        <i 
          class="el-icon-menu" 
          style="margin-right: 15px" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            command="signout">
            signout
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Tom</span>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ElementUIでの言語設定、datePickerとかで適用される
import locale from 'element-ui/lib/locale/lang/ja'

import firebase from '../plugins/firebase'

Vue.use(ElementUI, {locale});

export default{
  middleware: 'authorized',
  methods: {
    async handleCommand(command){
      switch(command){
        case 'signout':
          await this.signout();
          break;
      }
    },
    async signout(){
      await firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      }).catch(() => {
        this.$message.error('you cannot logout')
      })
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>

