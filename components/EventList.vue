<template>
  <div>
    <ul>
      <event-list-form 
        v-for="(event, index) in events"
        :key="index"
        :event="event"/>
    </ul>
    
  </div>
</template>

<script>
import EventListItem from './EventListItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    EventListItem
  },
  computed: {
    events() {
      return this.getFriends
    },
    ...mapGetters('home', {
      getEvents: 'getEvents'
    })
  },
  async created() {
    await this.fetchEventsFromAPIServer()
  },
  methods: {
    ...mapActions('home', [
      'fetchEventsFromAPIServer'
    ])
  }
}
</script>

<style>
.event-list{
  list-style: none;
  max-height: 100vh;
  overflow: scroll;
}
</style>
