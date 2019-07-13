<template>
  <el-form
    ref="makeFriendForm"
    :model="makeFriendForm"
    :rules="rules"
    status-icon
    label-position="top"
    label-width="120px">

    <el-form-item 
      label="ユーザID"
      prop="friendID">
      <el-input 
        v-model="makeFriendForm.friendID" 
        placeholder="user id"/>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary" 
        @click="submitForm('makeFriendForm')">
        送信
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import makeAuthHeaderBody from '../plugins/id-token'

export default {
  data(){
    return {
      makeFriendForm:{
        friendID: ''
      },
      rules:{
        friendID:[
          { required: true, message: 'input user id', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    async submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if(valid){
            const authHeaderBody = await makeAuthHeaderBody()
            const res = await this.$axios.post('http://localhost:3000/friendrelation', {
            friendID: this.makeFriendForm.friendID,
          },{
            headers: authHeaderBody
          }).catch((err) => {
            this.$message.error('some error occurs try again')
            return err.response;
          })
          if(res.status == 201){
            this.$message.success(this.makeRelationForm.friendID+' become your friend')
          }
        }else{
         this.$message.error('input value is invalid')
        }
      })
    }
  },
}
</script>

<style>
</style>