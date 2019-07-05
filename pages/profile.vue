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
            prop="name">
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
              @click="submitForm('form')">確認</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import makeAuthHeaderBody from '../plugins/id-token'

export default {
  layout : 'AuthPage',
  data() {
    return {
      form: {
        searchID: '',
        name: '',
        message: '',
      },
      rules: {
        searchID: [
          { required: true, message: 'Please input user id', trigger: 'blur' },
          { pattern: /^[\d\w]+$/g, message: 'Plase input number or alphabet', trigger: 'blur'}
        ],
        name: [
          { required: true, message: 'Please input user name', trigger: 'blur' },
          { pattern: /^[\d\w一-龠ぁ-んァ-ヶ]+$|^[\d\w一-龠ぁ-んァ-ヶ][\s\d\w一-龠ぁ-んァ-ヶ]*[\d\w一-龠ぁ-んァ-ヶ]$/u, message: 'Please input a string which does not begin/end with space', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          let authHeaderBody = await makeAuthHeaderBody();
          this.$axios.post('http://localhost:3000/profiles', {
              searchID: this.form.searchID,
              name: this.form.name,
              message: this.form.message,
            },{
              headers: authHeaderBody
            })
          .then(response => {
              console.log("response=" + response.data);
          })
        }else{
          this.$message.error('input value is invalid')
        }
      })
    }
  }
}
</script>

<style>

</style>
