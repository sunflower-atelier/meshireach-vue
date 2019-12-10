<template>
  <div>
    <ul id="event-list">
      <event-list-item
        v-for="(event, index) in events"
        :ref="`eventItem${event.id}`"
        :key="index"
        :event="event">
        <el-button
          type="primary"
          @click="joinEvent(event.id, `eventItem${event.id}`)">Join
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
  data(){
    return {
      intervalId: undefined
    }
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
    const updateEventFunc = this.updateEvents
    this.intervalId = setInterval(() => {
      updateEventFunc()
    }, 
    10000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    async joinEvent(eventID, refName) {

      const headers = await makeAuthHeaderBody()
      const res = await this.$axios.post(`/events/${eventID}/join`,{} ,{
        headers
      }).catch((err) => {
        return err.response
      })
      if(res.status === 201){
        this.$message.success('you have joined event')
        // refNameは一意に決まる, コードの妥当性は要検討
        this.$refs[refName][0].toggleDisplayEventDialog()

      }else{
        this.$message.error('you cannot join this event')
      }
    },
    ...mapActions('home', [
      'fetchEventsFromAPIServer'
    ]),
    async updateEvents(){
      const beforeLength = this.events.length
      await this.fetchEventsFromAPIServer()
      const afterLength = this.events.length
      if(beforeLength != afterLength){
        this.$emit('newEvent')
      }
    }
  }
}
</script>

<style scoped>
#event-list{
  list-style: none;
  max-height: 100vh;
  overflow: scroll;
  padding-left: 0;
}
</style>
