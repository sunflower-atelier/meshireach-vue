<template>
  <ul id="friend-list">
    <friend-list-item
      v-for="(friend, index) in friends"
      :key="index"
      :friend="friend"/>
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
      friends: []
    }
  },
  computed: {
    ...mapGetters('home', {
      getFriends: 'getFriends'
    })
  },
  async created() {
    await this.fetchFriendsFromAPIServer()
    this.friends = this.getFriends
  },
  methods: {
    ...mapActions('home', [
      'fetchFriendsFromAPIServer'
    ])
  }
}
</script>

<style>
  #friend-list {
    max-height: 100vh;
    overflow: scroll;
  }
</style>
