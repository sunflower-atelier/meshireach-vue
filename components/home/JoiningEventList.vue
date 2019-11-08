<template>
  <div>
    <ul id="joining-event-list">
      <event-list-item
        v-for="(event, index) in joiningEvents"
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
    joiningEvents() {
      return this.getJoiningEvents
    },
    ...mapGetters('home', {
      getJoiningEvents: 'getJoiningEvents'
    })
  },
  async created() {
    await this.fetchJoiningEventsFromAPIServer()
  },
  methods: {
    ...mapActions('home', [
      'fetchJoiningEventsFromAPIServer'
    ])
  }
}
</script>

<style scoped>
#joning-event-list{
  list-style: none;
  max-height: 100vh;
  overflow: scroll;
}
</style>
