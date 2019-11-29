<template>
  <ul id="friend-list">
    <friend-list-item
      v-for="(friend, index) in friends" 
      :key="index" 
      :friend="friend" />
  </ul>
</template>

<script>
import friendListItem from "./FriendListItem"
import { mapGetters, mapActions } from "vuex"
export default {
  components: {
    friendListItem
  },
  data() {
    return {
      intervalId: undefined
    }
  },
  computed: {
    friends() {
      return this.getFriends
    },
    ...mapGetters("home", {
      getFriends: "getFriends"
    })
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  async created() {
    this.intervalId = setInterval(this.fetchFriendsFromAPIServer, 10000)
    await this.fetchFriendsFromAPIServer()
  },
  methods: {
    ...mapActions("home", ["fetchFriendsFromAPIServer"])
  }
}
</script>

<style scoped>
#friend-list {
  max-height: 100vh;
  overflow: scroll;
  padding-left: 0;
}
</style>
