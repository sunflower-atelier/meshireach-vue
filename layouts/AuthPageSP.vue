<template>
  <el-container>
    <el-header id="app-header">
      <div>meshireach</div>
      <el-button 
        icon="el-icon-menu"
        @click="openMenu"/>
      <el-drawer
        id="drawer-menu"
        :visible.sync="isDrawerOpen"
        :direction="drawerOpenDirection"
        size="60%">
        <div
          v-if="currentUser"
          id="profile-wrapper">
          <p id="user-name">{{ currentUser.name }}</p>
          <p id="user-id">ID: {{ currentUser.searchID }}</p>
        </div>
        <el-menu>
          <template v-if="currentUser">
            <el-menu-item @click="toggleEventForm">
              <i class="el-icon-dish"/>
              <span>make meshi</span>
            </el-menu-item>
            <el-menu-item @click="toggleFriendForm">
              <i class="el-icon-user"/>
              make friend
            </el-menu-item>
            <el-menu-item @click="userSetting">
              <i class="el-icon-setting"/>
              user setting
            </el-menu-item>
          </template>
          <el-menu-item @click="signout">
            <i class="el-icon-switch-button"/>
            signout
          </el-menu-item>
        </el-menu>
      </el-drawer>
      <el-dialog
        :visible.sync="eventFormVisible"
        title="input meshi detail"
        custom-class="sp-dialog">
        <event-form @event-created="toggleEventForm"/>
      </el-dialog>
      <el-dialog
        :visible.sync="friendFormVisible"
        title="input your friend's id"
        custom-class="sp-dialog">
        <friend-form @friend-created="toggleFriendForm"/>
      </el-dialog>
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
import FriendForm from '../components/friendForm/FriendForm'
import EventForm from '../components/eventForm/EventForm'

Vue.use(ElementUI, {locale})

export default{
  middleware: 'authorized',
  components: {
    EventForm,
    FriendForm
  },
  data(){
    return {
      friendFormVisible: false,
      eventFormVisible: false,
      isDrawerOpen: false,
      drawerOpenDirection: 'rtl'
    }
  },
  computed: {
    currentUser(){
      return this.$store.state.profile.currentUser
    }
  },
  methods: {
    async signout(){
      await firebase.auth().signOut().then(() => {
        this.$store.commit('profile/clearCurrentUser', null)
        this.$router.push('/login')
      }).catch(() => {
        this.$message.error('you cannot logout')
      })
    },
    toggleEventForm(){
      this.eventFormVisible = !this.eventFormVisible
    },
    toggleFriendForm(){
      this.friendFormVisible = !this.friendFormVisible
    },
    userSetting(){
      this.$message.success('user setting')
    },
    openMenu(){
      this.isDrawerOpen = true
    }
  }
}
</script>

<style scoped>
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

#app-header{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

#user-name{
  font-size: 24px;
  font-weight: bold;
}
#user-id{
  font-size: 18px;
  color: #a9a9a9;
}
#profile-wrapper{
  padding: 0 20px 10px 20px;
  border-right: solid 1px #e6e6e6;
  border-bottom: solid 1px #e6e6e6;
}
</style>

<style>
.sp-dialog{
  min-width: 200px;
  width: 90%;
} 
</style>
