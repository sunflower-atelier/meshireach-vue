<template>
  <el-container>
    <el-header id="back-header">
      <el-page-header 
        title=""
        content="user setting"
        @back="goBack"/>
    </el-header>
    <el-main>
      <edit-profile-form class="setting-card"/>
      <notification-setting class="setting-card"/>
    </el-main>
  </el-container>
</template>

<script>
import EditProfileForm from '../components/userSetting/EditProfileForm.vue'
import NotificationSetting from '../components/userSetting/NotificationSetting.vue'
export default {
  middleware: 'authorized',
  components: {
    EditProfileForm,
    NotificationSetting
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
.setting-card{
  max-width: 700px;
  margin: 20px auto;
}
</style>
