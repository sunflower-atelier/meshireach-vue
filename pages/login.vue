<template>
    <el-container>
        <el-main>
            <h1>meshireach</h1>
            <h2>your awesome dish</h2>
            <el-tabs type="border-card" stretch>
                <el-tab-pane label="Signin">
                    <signin-signup-form form-role='signin'></signin-signup-form>
                </el-tab-pane>
                <el-tab-pane label="Signup">
                    <signin-signup-form form-role='signup'></signin-signup-form>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
import SigninSignupForm from '~/components/SigninSignupForm.vue'

export default{
    middleware: 'anonymous',
    components: {
        SigninSignupForm,
    }
}
</script>

<style>
    /*.el-main{
        width: 80%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }*/
</style>