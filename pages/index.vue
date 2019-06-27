<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        meshireach
      </h1>
      <h2 class="subtitle">
        View of meshireach
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
      <el-button
        type="primary"
        size="medium"
        @click="logout">
        logout
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="sendPrivate">
        send private
      </el-button>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import firebase from '../plugins/firebase'
import getIdToken from '../plugins/id-token'

export default {
  components: {
    AppLogo
  },
  methods:{
    async logout(){
      await firebase.auth().signOut().then(() => {
        this.$router.push('/login')
      }).catch(() => {
        this.$message.error('you cannot logout')
      })
    },
    async sendPrivate(){
      let idToken = await getIdToken()
      let sendMsg = 'Bearer ' +idToken
      let res = await this.$axios.get('http://localhost:3000/private' ,{
        headers: {
          'Authorization': sendMsg,
        }
      })
      console.log(res)
    }
  },
  middleware: 'authorized',
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

