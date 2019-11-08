<template>
  <profile-form/>
</template>

<script>
import ProfileForm from '../components/profileForm/ProfileForm.vue'
export default {
  layout: (ctx) => ctx.isMobile||ctx.isTablet ? 'AuthPageSP' : 'AuthPagePC',
  components: {
    ProfileForm
  }
}
</script>

<style>

</style>
