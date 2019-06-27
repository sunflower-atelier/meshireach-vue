<template>
  <div>
    <el-card shadow="never">
      <el-form
        ref="form"
        :model="form"
        label-width="120px">
        <el-form-item label="mail adress">
          <el-input
            v-model="form.email"
            placeholder="your@email.com"/>
        </el-form-item>
        <el-form-item label="password">
          <el-input
            v-model="form.password"
            placeholder="your password"
            type="password"/>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="clickFormButton">
            {{ formRole }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  props: {
    formRole: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      form:{
        email: '',
        password:''
      }
    }
  },
  methods: {
    clickFormButton: function(){
      this.$emit('click-form-button',this.form)
    },
    clickGoogleButton: function(){
      this.$emit('click-google-button')
    }
  }
}
</script>

<style scoped>
</style>
