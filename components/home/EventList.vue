<template>
  <div>
    <ul id="event-list">
      <event-list-item
        v-for="(event, index) in events"
        :key="index"
        :event="event">
        <el-button
          type="primary"
          @click="joinEvent(event.id)">Join
        </el-button>
      </event-list-item>
    </ul>
  </div>
</template>

<script>
import EventListItem from './EventListItem'
import { mapGetters, mapActions } from 'vuex'
import makeAuthHeaderBody from '../../plugins/id-token'

export default {
  components: {
    EventListItem
  },
  computed: {
    events() {
      return this.getEvents
    },
    ...mapGetters('home', {
      getEvents: 'getEvents'
    })
  },
  async created() {
    await this.fetchEventsFromAPIServer()
  },
  methods: {
    async joinEvent(eventID) {
      const headers = await makeAuthHeaderBody()
      const res = await this.$axios.post(`/events/${eventID}/join`,{} ,{
        headers
      }).catch((err) => {
        return err.response
      })
      if(res.status === 201){
        this.$message.success('you have joined event')
      }else{
        this.$message.error('you cannot join this event')
      }
    },
    ...mapActions('home', [
      'fetchEventsFromAPIServer'
    ])
  }
}
</script>

<style scoped>
#event-list{
  list-style: none;
  max-height: 100vh;
  overflow: scroll;
}
</style>
