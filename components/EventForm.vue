<template>
  <el-form
    ref="meshiForm"
    :model="meshiForm"
    :rules="rules"
    status-icon
    label-position="top"
    label-width="120px">

    <el-form-item 
      label="title"
      prop="title">
      <el-input 
        v-model="meshiForm.title" 
        placeholder="user id"/>
    </el-form-item>

    <el-form-item 
      label="date"
      prop="date">
      <el-date-picker
        v-model="meshiForm.date" 
        :picker-options="datePickerOptions"
        placeholder="Select a date"/>
    </el-form-item>

    <el-form-item 
      label="time"
      prop="time">
      <el-time-select
        v-model="meshiForm.time" 
        :picker-options="timePickerOptions"
        placeholder="Select time"/>
    </el-form-item>

    <el-button
      type="primary" 
      @click="submitForm('meshiForm')">
      送信
    </el-button>
  </el-form>
</template>

<script>

export default {
  data(){
    return {
      datePickerOptions: {
        disabledDate(time){
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return time.getTime() < today.getTime() || time.getTime() > today.getTime() + 3600 * 24 * 1000 * 3
        }
      },
      timePickerOptions: {
        format: 'HH:mm',
        step: '00:30',
        start: '00:00',
        end: '23:30'
      },
      meshiForm:{
        title: '',
        date: null,
        time: null
      },
      rules:{
        title:[
          { required: true, message: 'input title', trigger: 'blur' }
        ],
        date:[
          { required: true, message: 'input date', trigger: 'blur' }
        ],
        time:[
          { required: true, message: 'input time', trigger: 'blur' }
        ] 
      }
    }
  },
  methods:{
    async submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if(valid){
          console.log("post")
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
