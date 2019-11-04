<template>
  <div id="top-view-wrapper">
    <el-tabs stretch>
      <el-tab-pane label="ダチのめし募集">
        <event-list/>
      </el-tab-pane>
      <el-tab-pane label="自分のめし募集">
        <my-event-list/>
      </el-tab-pane>
      <el-tab-pane label="ダチリスト">
        <friend-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import EventList from '../components/home/EventList'
import FriendList from '../components/home/FriendList'
import MyEventList from '../components/home/MyEventList'
import firebase from '../plugins/firebase'
import makeAuthHeaderBody from '~/plugins/id-token'

export default {
  layout: (ctx) => ctx.isMobile ? 'AuthPageSP' : 'AuthPagePC',
  components: {
    EventList,
    FriendList,
    MyEventList
  },
  data() {
    return {
      removeOnMessageFunction: null
    }
  },
  created() {
    if(firebase.messaging.isSupported()){
      const messaging = firebase.messaging()
      this.removeOnMessageFunction = messaging.onMessage((payload) => {
        this.$notify({
          title: payload.notification.title,
          message: payload.notification.body
        })
      })
      messaging.requestPermission()
        .then(() => {
          this.postDeviceToken()
        })
        .catch((error) => {
          console.log(error)
        })
      messaging.onTokenRefresh(() => {
        this.postDeviceToken()
      })
    }
  },
  beforeDestroy() {
    this.removeOnMessageFunction()
  },
  methods: {
    async postDeviceToken(){
      const messaging = firebase.messaging()
      const token = await messaging.getToken()
      const authHeaderBody = await makeAuthHeaderBody()
      this.$axios.post('/device/token', {
        device_token: token,
      },{
        headers: authHeaderBody
      }).catch((err) => {
        return err.response
      })
    }
  }
}
</script>

<style>
#top-view-wrapper {
  max-width : 800px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
}
.el-tab-pane{
  padding: 10px 15px 10px 15px;
}
</style>
