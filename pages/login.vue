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
              @click-form-button="signinWithForm"
              @click-google-button="signinWithGoogle"/>
          </el-tab-pane>
          <el-tab-pane label="Signup">
            <signin-signup-form
              form-role="signup"
              @click-form-button="signupWithForm"
              @click-google-button="signupWithGoogle"/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SigninSignupForm from '../components/SigninSignupForm.vue'
import firebase from '../plugins/firebase.js'

export default{
  middleware: 'anonymous',
  components: {
    SigninSignupForm,
  },
  // signin,signupの手段が決まったら変更する
  methods:{
    async signinWithForm(formVal){
      let res = await firebase.auth().signInWithEmailAndPassword(formVal.email, formVal.password).catch(() => {
        this.$message.error('invalid input')
      })
      if(res){
        this.$message.success('you are user')
        this.setUserAndRedirect()
      }
    },
    signinWithGoogle : function(){
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    async signupWithForm(formVal) {
      await firebase.auth().createUserWithEmailAndPassword(formVal.email, formVal.password).catch(() => {
        this.$message.error('invalid input')
      })
      this.$message.success('your account is created.')
      this.setUserAndRedirect()
    },
    async signupWithGoogle(){
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    setUserAndRedirect : function(){
      // this.$store.dispatch('setUser', user)
      // console.log(this.$store.state)
      this.$router.push('/')
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
