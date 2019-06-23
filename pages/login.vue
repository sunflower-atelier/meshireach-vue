<template>
  <el-container>
    <el-main>
      <div class="form-wrapper">
        <h1>meshireach</h1>
        <h2>your awesome dish</h2>
        <el-tabs
          type="border-card"
          stretch>
          <el-tab-pane label="Signin">
            <signin-signup-form
              form-role="signin"
              @click-form-button="signinWithForm"/>
          </el-tab-pane>
          <el-tab-pane label="Signup">
            <signin-signup-form
              form-role="signup"
              @click-form-button="signupWithForm"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SigninSignupForm from '../components/SigninSignupForm.vue'
import firebase from '../plugins/firebase'

export default{
  middleware: 'anonymous',
  components: {
    SigninSignupForm,
  },
  methods:{
    async signinWithForm(formVal){
      firebase.auth().signInWithEmailAndPassword(formVal.email, formVal.password).then(() => {
        this.$message.success('Signin Succeeded')
        this.$router.push('/')
      }).catch(() => {
        this.$message.error('Signin Failed')
      })
    },
    async signupWithForm(formVal) {
      firebase.auth().createUserWithEmailAndPassword(formVal.email, formVal.password).then(() => {
        this.$message.success('your account is created.')
        this.$router.push('/')
      }).catch(() => {
        this.$message.error('invalid input')
      })
    }
  }
}
</script>

<style scoped>
h1{
  font-size: 50px;
  text-align: center;
}
h2{
  font-size: 40px;
  text-align: center;
}
.el-tabs{
  margin-top: 20px;
}

@media screen and (min-width: 768px){
  .form-wrapper{
    width: 70%;
    margin: 0 auto;
  }
}
</style>
