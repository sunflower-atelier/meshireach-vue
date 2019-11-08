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
        placeholder="input title" />
    </el-form-item>

    <el-form-item
      label="time"
      required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker
            v-model="eventForm.date"
            :picker-options="datePickerOptions"
            value-format="yyyy-MM-dd"
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
            placeholder="Select time"/>
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
import moment from 'moment'
import makeAuthHeaderBody from '~/plugins/id-token'

export default {
  data(){
    return {
      datePickerOptions: {
        disabledDate(date){
          const eachDate = moment(date)
          const today = moment({hour:0, mninute:0, seconds:0, milliseconds:0})
          const upperLimitDate = today.clone().add(3,'days')
          return eachDate.isBefore(today) || eachDate.isAfter(upperLimitDate)
        }
      },
      timePickerOptions: {
        format: 'HH:mm',
        step: '00:15',
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
          { validator: this.validateDate, trigger: 'blur' }
        ],
        time:[
          { validator: this.validateTime, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    async submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
        if(!valid){
          this.$message.error('input value is invalid')
          return
        }
        const authHeaderBody = await makeAuthHeaderBody()
        const title = this.eventForm.title
        const deadline = moment(this.eventForm.date+' '+this.eventForm.time, 'YYYY-MM-DD HH:mm')
        const res = await this.$axios.post('/events', {
          title: title,
          deadline: deadline.format()
        },{
          headers: authHeaderBody
        }).catch((err) => {
          this.$message.error('some error occurs try again')
          return err.response
        })
        if(res.status === 201){
          this.$message.success('new event created')
          this.$refs[formName].resetFields()
          this.$emit('event-created')
        }
      })
    },
    validateDate(rules, value, callback){
      if(value === ''){
        callback(new Error('pick a date'))
        return
      }

      const today = moment({hour:0, mninute:0, seconds:0, milliseconds:0})
      const inputDate = moment(value, 'YYYY-MM-DD')
      if(inputDate.isBefore(today)){
        callback(new Error('pick future date'))
        return
      }

      if(this.eventForm.time !== ''){
        this.$refs.eventForm.validateField('time')
      }
      callback()
    },
    validateTime(rules, value, callback){
      if(value === ''){
        callback(new Error('select time'))
        return
      }

      if(this.eventForm.date === ''){
        callback()
        return
      }

      const now = moment()
      const inputDate = moment(this.eventForm.date+' '+value, 'YYYY-MM-DD HH:mm')

      if(now.isBefore(inputDate)){
        callback()
        return
      }

      callback(new Error('select future time'))
      return
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
