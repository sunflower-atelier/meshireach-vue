<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="mail adress">
                <el-input placeholder="your@email.com" v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input placeholder="your password" v-model="form.password" type="password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button size="medium" @click="clickFormButton">{{ formRole }}</el-button>
            </el-form-item>
        </el-form>
        <el-button size="medium" @click="clickGoogleButton">{{ formRole }} with anothor acount</el-button>
    </div>
</template>

<script>

export default {
    props: ['formRole'],
    data() {
        return {
            form:{
                email: "",
                password:""
            }
        }
    },
    methods: {
        clickFormButton: function(event){
            this.$emit('click-form-button',this.data)
        },
        clickGoogleButton: function(event){
           this.$emit('click-google-button')
        }
    }
}
</script>