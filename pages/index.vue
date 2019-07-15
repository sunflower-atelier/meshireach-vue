<template>
  <div id="top-view-wrapper">
    <p 
      id="user-name" 
      class="profile-text">
      {{ this.$store.state.profile.currentUser.name }}
    </p>
    <p 
      id="user-id" 
      class="profile-text">
      {{ this.$store.state.profile.currentUser.searchID }}
    </p>
    <p 
      id="user-message" 
      class="profile-text">
      {{ this.$store.state.profile.currentUser.message }}
    </p>
    <el-tabs stretch="true">
      <el-tab-pane label="ダチのめし募集">
        めしりすと
      </el-tab-pane>
      <el-tab-pane label="自分のめし募集">
        じぶんのめしりすと
      </el-tab-pane>
      <el-tab-pane label="ダチリスト">
        だちのりすと
      </el-tab-pane>
      <el-tab-pane label="ダチの追加">
        <friend-form/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FriendForm from '../components/FriendForm' 
import makeAuthHeaderBody from '../plugins/id-token'

export default {
  layout : 'AuthPage',
  components: {
    FriendForm
  },
  methods:{
    async sendPrivate(){
      const authHeader = await makeAuthHeaderBody();
      const res = await this.$axios.get('http://localhost:3000/private' ,{
        headers: authHeader
      })
      console.log(res)
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
#user-name{
  font-size: 24px;
  font-weight: bold;
}
#user-id{
  font-size: 18px;
  color: #a9a9a9;
}
#user-message{
  margin-top: 20px;
}
.profile-text{
  padding-left: 20px;
}
.el-tabs{
  margin-top: 20px;
}
.el-tab-pane{
  padding: 10px 15px 10px 15px;
}
</style>

