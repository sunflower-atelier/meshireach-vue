<template>
  <el-card>
    <h1>プロフィール変更画面</h1>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      label-position="top"
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
          @click="submitForm('form')">送信</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import makeAuthHeaderBody from '~/plugins/id-token'
import * as validation from '~/util/validation'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
        searchID: '',
        userName: '',
        message: '',
      },
      rules: {
        searchID: [
          { required: true, message: 'input user id', trigger: 'blur' },
          { pattern: validation.searchIDValidation, message: 'input digit or word charactor', trigger: 'blur'}
        ],
        userName: [
          { required: true, message: 'input user name', trigger: 'blur' },
          { pattern: validation.userNameValidation, message: 'Please input a string which does not begin/end with space', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters('profile', {
      userProfile: 'getCurrentUser'
    })
  },
  created() {
    this.form.searchID = this.userProfile.searchID
    this.form.userName = this.userProfile.name
    this.form.message = this.userProfile.message
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          await this.sendProfileToServer(this.form.searchID, this.form.userName, this.form.message)
        }else{
          this.$message.error('input value is invalid')
        }
      })
    },
    async sendProfileToServer(searchID, name, message){
      const authHeaderBody = await makeAuthHeaderBody()
      const res = await this.$axios.put('/profiles', {
        searchID: searchID,
        name: name,
        message: message,
      },{
        headers: authHeaderBody
      }).catch((err) => {
        this.$message.error('some error occurs try again')
        return err.response
      })
      if(res.status === 200){
        const user = res.data
        this.$store.commit('profile/setCurrentUser', user)
        this.$message.success('your prodile changed')
      }
    }
  }
}
</script>
