<template>
  <el-form
    ref="eventForm"
    :model="eventForm"
    :rules="rules"
    status-icon
    label-position="top"
    label-width="120px">

    <el-form-item 
      label="title"
      prop="title">
      <el-input 
        v-model="eventForm.title" 
        placeholder="input title"/>
    </el-form-item>

    <el-form-item 
      label="time"
      required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker
            v-model="eventForm.date" 
            :picker-options="datePickerOptions"
            value-format="yyyy/MM/dd"
            placeholder="Pick a date"/>
        </el-form-item>
      </el-col>
      <el-col 
        :span="2"
        class="line">
        -
      </el-col>
      <el-col :span="11">
        <el-form-item prop="time">
          <el-time-select
            v-model="eventForm.time" 
            :picker-options="timePickerOptions"
            placeholder="Pick a time"/>
        </el-form-item>
      </el-col>
    </el-form-item>

    <el-button
      type="primary" 
      @click="submitForm('eventForm')">
      送信
    </el-button>
  </el-form>
</template>

<script>

export default {
  data(){
    const validateDate = (rules, value, callback) => {
      if(value !== ''){
        if(this.eventForm.time !== ''){
          this.$refs.eventForm.validateField('time')
        }
        callback()
      }else{
        callback(new Error('pick a date'))
      }
    }
    const validateTime = (rules, value, callback) => {
      if(value === ''){
        callback(new Error('pick a date'))
        return
      }
      
      if(this.eventForm.date ===  ''){
        callback()
        return
      }

      const now = new Date()
      const inputDate = new Date(this.eventForm.date+' '+value)

      if(now < inputDate){
        callback()
        return
      }

      callback(new Error('pick future'))
      return
    }
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
      eventForm:{
        title: '',
        date: '',
        time: ''
      },
      rules:{
        title:[
          { required: true, message: 'input title', trigger: 'blur' }
        ],
        date:[
          { validator: validateDate, trigger: 'blur' }
        ],
        time:[
          { validator: validateTime, trigger: 'blur' }
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
.line{
  text-align: center;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
