<template>
  <el-container>
    <el-main>
      <el-card>
        <h1>プロフィール入力画面</h1>
        <el-form
          ref="form"
          :model="form"
          label-width="120px">
          <el-form-item 
            label="ユーザーID">
            <el-input 
              v-model="form.searchId" 
              placeholder="user id"/>
          </el-form-item>
          <el-form-item label="名前">
            <el-input 
              v-model="form.name"
              placeholder="your name"/>
          </el-form-item>
          <el-form-item label="ひとこと">
            <el-input 
              v-model="form.message"
              placeholder="message to other users" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onConfirm">確認</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  layout : 'AuthPage',
  data() {
    return {
      form: {
        searchId: '',
        name: '',
        message: '',
      }
    }
  },
  methods: {
    onConfirm() {
      this.$axios.post('http://localhost:3000/profile', {
        name: "hoge",
        message: "foo",
      })
        .then(response => {
          console.log("name=" + response.data.name);
      })
    }
  }
}
</script>

<style>

</style>
