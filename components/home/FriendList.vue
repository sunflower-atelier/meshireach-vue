<template>
  <ul id="friend-list">
    <friend-list-item
      v-for="(friend, index) in friends" 
      :key="index" 
      :friend="friend" />
  </ul>
</template>

<script>
import friendListItem from './FriendListItem'
import { mapGetters, mapActions } from 'vuex'
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
    ...mapGetters('home', {
      getFriends: 'getFriends'
    })
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  async created() {
    const updateFriends = this.updateFriends
    this.intervalId = setInterval(() => {
      updateFriends()
    }, 10000)
    await this.fetchFriendsFromAPIServer()
  },
  methods: {
    async updateFriends() {
      const beforeLength = this.friends.length
      await this.fetchFriendsFromAPIServer()
      const afterLength = this.friends.length
      if (beforeLength != afterLength) this.$emit('newFriend')
    },
    ...mapActions('home', ['fetchFriendsFromAPIServer'])
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
