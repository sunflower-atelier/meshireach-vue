<template>
    <div>
        <div class="box">
            <h2 class="title is-3">{{ formRole }}</h2>
            <div class="field">
                <label class="label">mail-address</label>
                <input class="input" type="text" placeholder="your mail address">
            </div>
            <div class="field">
                <label class="label">password</label>
                <input class="input" type="password" placeholder="Password">
            </div>
            <div class="columns is-right">
                <div class="column is-4 is-offset-8">
                    <button class="button is-fullwidth" @click="clickFormButton">{{ formRole }}</button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-10">
                    <button class="button is-fullwidth" @click="clickGoogleButton">{{ formRole }} with anothor acount</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['formRole'],
    methods: {
        clickFormButton: function(event){
            if(this.formRole == 'signin'){
                this.signinWithForm()
            }else if(this.formRole == 'signup'){
                this.signupWithForm()
            }
        },
        clickGoogleButton: function(event){
            if(this.formRole == 'signin'){
                this.signinWithGoogle()
            }else if(this.formRole == 'signup'){
                this.siguupWithGoogle()
            }
        },
        signinWithForm: function(){
            console.log('signin form')
            this.$store.commit('setUser',100)
            this.$router.push('/')
        },
        signinWithGoogle: function(){
            console.log('signin google')
            this.$store.commit('setUser',100)
            this.$router.push('/')
        },
        signupWithForm: function(){
            console.log('signup form')
            this.$store.commit('setUser',100)
            this.$router.push('/')
        },
        signupWithGoogle: function(){
            console.log('signup gogle')
            this.$store.commit('setUser',100)
            this.$router.push('/')
        }
    }
}
</script>