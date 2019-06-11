<template>
  <el-container>
    <el-main>
      <div class="form-wrapper">
        <h1>meshireach</h1>
        <h2>your awesome dish</h2>
        <el-tabs type="border-card" stretch>
          <el-tab-pane label="Signin">
            <signin-signup-form form-role='signin' @click-form-button="signinWithForm" @click-google-button="signinWithGoogle"></signin-signup-form>
          </el-tab-pane>
          <el-tab-pane label="Signup">
            <signin-signup-form form-role='signup' @click-form-button="signupWithForm" @click-google-button="signupWithGoogle"></signin-signup-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import SigninSignupForm from '~/components/SigninSignupForm.vue'

export default{
  middleware: 'anonymous',
  components: {
    SigninSignupForm,
  },
  // signin,signupの手段が決まったら変更する
  methods:{
    signinWithForm : function(formVal){
      console.log("signin with form")
      console.log(formVal.email)
      console.log(formVal.password)
      this.$store.commit('setUser',100)
      this.$router.push('/')
    },
    signinWithGoogle : function(){
      console.log("signin with google")
      this.$store.commit('setUser',100)
      this.$router.push('/')
    },
    signupWithForm : function(formVal){
      console.log("signup with form")
      console.log(formVal.email)
      console.log(formVal.password)
      this.$store.commit('setUser',100)
      this.$router.push('/')
    },
    signupWithGoogle : function(){
      console.log("signup with google")
      this.$store.commit('setUser',100)
      this.$router.push('/')
    },
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