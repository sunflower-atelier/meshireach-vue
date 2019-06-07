<template>
    <section class="section is-large">
        <div class="columns is-centered is-desktop">
            <div class="column is-half">
                <div class="container is-fluid">
                    <h1 class="title is-1 has-text-centered">meshireach</h1>
                    <p class="subtitle is-2 has-text-centered">your awesome dish</p>
                    <div class="tabs is-fullwidth is-centered is-toggle">
                        <ul>
                            <li v-bind:class="{'is-active': displayTab === 'signin'}" @click='displaySignin'><a>signin</a></li>
                            <li v-bind:class="{'is-active': displayTab === 'signup'}" @click="displaySignup"><a>signup</a></li>
                        </ul>
                    </div>
                    <signin-signup-form form-role='signin' v-if="displayTab === 'signin' "></signin-signup-form>
                    <signin-signup-form form-role='signup' v-if="displayTab === 'signup' "></signin-signup-form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SigninSignupForm from '~/components/SigninSignupForm.vue'

export default{
    middleware: 'anonymous',
    data: function(){
        return {
            displayTab: 'signin'
        }
    },
    components: {
        SigninSignupForm,
    },
    methods: {
        displaySignin: function(){
            this.displayTab = 'signin'
        },
        displaySignup: function(){
            this.displayTab = 'signup'
        }
    }
}
</script>

<style>
    
</style>