<template>
  <el-card>
    <h1>通知設定</h1>
    <div class="flex-container">
      <div class="flex-item">通知を許可</div>
      <el-switch 
        v-model="permitted"
        @change="changeSwitch"/>
    </div>
  </el-card>
</template>

<script>

import { mapGetters } from 'vuex'
import firebase from '../../plugins/firebase'
import makeAuthHeaderBody from '../../plugins/id-token'

export default {
  data() {
    return {
      permitted: false,
    }
  },
  computed: {
    ...mapGetters('profile', {
      userProfile: 'getCurrentUser'
    })
  },
  created() {
  },
  methods: {
    changeSwitch() {
      if (this.permitted == true){
        this.postDeviceToken()
      } else {
        this.deleteDeviceToken()
      }
    },
    async postDeviceToken() {
      const messaging = firebase.messaging()
      const token = await messaging.getToken()
      const authHeaderBody = await makeAuthHeaderBody()
      this.$axios.post('/device/token', {
        device_token: token,
      }, {
        headers: authHeaderBody
      }).catch((err) => {
        return err.response
      })
    },
    async deleteDeviceToken() {
      const authHeaderBody = await makeAuthHeaderBody()
      this.$axios.delete('/device/tokens', {
        headers: authHeaderBody
      }).catch((err) => {
        return err.response
      })
    }
  }
}
</script>

<style>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}
</style>
