<template>
  <div>
    <ul id="my-event-list">
      <event-list-item
        v-for="(event, index) in myEvents"
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
    ...mapGetters('home', {
      myEvents: 'getMyEvents'
    })
  },
  async created() {
    await this.fetchMyEventsFromAPIServer()
  },
  methods: {
    ...mapActions('home', [
      'fetchMyEventsFromAPIServer'
    ])
  }
}
</script>

<style scoped>
#my-event-list{
  list-style: none;
  max-height: 100vh;
  overflow: scroll;
}
</style>
