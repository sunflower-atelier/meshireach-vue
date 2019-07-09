<template>
  <el-container>
    <el-main>
      <el-card>
        <h1>プロフィール入力画面</h1>
        <el-form
          ref="form" 
          :model="form" 
          :rules="rules" 
          status-icon 
          label-width="120px">
          <el-form-item 
            label="ユーザーID" 
            prop="searchID">
            <el-input 
              v-model="form.searchID" 
              placeholder="user id"/>
          </el-form-item>
          <el-form-item 
            label="名前"
            prop="userName">
            <el-input 
              v-model="form.userName" 
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
              @click="submitForm('form')">確認</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import makeAuthHeaderBody from '../plugins/id-token'
import * as validation from '../util/validation'

export default {
  layout : 'AuthPage',
  data() {
    return {
      form: {
        searchID: '',
        userName: '',
        message: '',
      },
      rules: {
        searchID: [
          { required: true, message: 'Please input user id', trigger: 'blur' },
          { pattern: validation.searchIDValidation, message: 'Plase input number or alphabet', trigger: 'blur'}
        ],
        userName: [
          { required: true, message: 'Please input user name', trigger: 'blur' },
          { pattern: validation.userNameValidation, message: 'Please input a string which does not begin/end with space', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          await this.sendProfileToServer(this.form.searchID, this.form.name, this.form.message)
        }else{
          console.log(valid)
          this.$message.error('input value is invalid')
        }
      })
    },
    async sendProfileToServer(searchID, name, message){
      let authHeaderBody = await makeAuthHeaderBody();
      let res = await this.$axios.post('http://localhost:3000/profiles', {
        searchID: searchID,
        name: userName,
        message: message,
      },{
        headers: authHeaderBody
      }).catch(() => {
        this.$message.error('some error occurs try again')
        return;
      })
      console.log(res)
    }
  }
}
</script>

<style>

</style>
