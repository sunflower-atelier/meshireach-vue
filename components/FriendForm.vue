<template>
  <el-form
    ref="friendForm"
    :model="friendForm"
    :rules="rules"
    status-icon
    label-position="top"
    label-width="120px">

    <el-form-item 
      label="ユーザID"
      prop="friendID">
      <el-input 
        v-model="friendForm.friendID" 
        placeholder="user id"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary" 
        @click="submitForm('friendForm')">
        送信
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import makeAuthHeaderBody from '../plugins/id-token'
import { searchIDValidation } from '../util/validation'

export default {
  data(){
    return {
      friendForm:{
        friendID: ''
      },
      rules:{
        friendID:[
          { required: true, message: 'input user id', trigger: 'blur' },
          { pattern: searchIDValidation, message: 'user id contains only digit or word charactor', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    async submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if(!valid){
          this.$message.error('input value is invalid')
          return
        }

        const friendID = this.friendForm.friendID
        const authHeaderBody = await makeAuthHeaderBody()
        
        const res = await this.$axios.post('http://localhost:3000/friends', {
          searchID: friendID,
        },{
          headers: authHeaderBody
        }).catch((err) => {
          this.$message.error('some error occurs try again')
          return err.response;
        })
        if(res.status == 201){
          this.$message.success(res.data.searchID+' become your friend')
          this.$refs[formName].resetFields()
          this.$emit('success-friend-make')
        }
      })
    }
  }
}
</script>

<style>
</style>
