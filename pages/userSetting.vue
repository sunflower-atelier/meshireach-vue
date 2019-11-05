<template>
  <el-container>
    <el-header id="back-header">
      <el-page-header 
        title=""
        content="user setting"
        @back="goBack"/>
    </el-header>
    <el-main>
      <edit-profile-form/>
    </el-main>
  </el-container>
</template>

<script>
import EditProfileForm from '../components/profileForm/EditProfileForm.vue'
export default {
  middleware: 'authorized',
  components: {
    EditProfileForm
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
#back-header{
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
