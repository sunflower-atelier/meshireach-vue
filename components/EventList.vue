<template>
  <div>
    <ul>
      <li 
        v-for="event in events" 
        :key="event.id"
        class="event-list">
        <el-card class="box-card">
          <div slot="header">
            <span>{{ event.title }}</span>
          </div>
          <dl>
            <dt>owner</dt>
            <dd>{{ event.owner }}</dd>
          </dl>
          <dl>
            <dt>date</dt>
            <dd>{{ event.deadline }}</dd>
          </dl>
          <div class="card-bottom">
            <el-button 
              type="text"
              @click="openEventDialog(event.id)">
              詳細表示
            </el-button>
          </div>
        </el-card>
      </li>
    </ul>
    <el-dialog 
      :visible.sync="eventDialogVisible"
      @open="getEventDetail">
      <div slot="title">
        {{ displayEvent.title }}
      </div>
      <dl>
        <dt>owner</dt>
        <dd>{{ displayEvent.owner }}</dd>
      </dl>
      <dl>
        <dt>time</dt>
        <dd>{{ displayEvent.deadline }}</dd>
      </dl>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button @click="toggleDisplayEventDialog">Cancel</el-button>
        <el-button 
          type="primary" 
          @click="joinEvent">Join</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import makeAuthHeaderBody from '../plugins/id-token'

export default {
  data() {
    return{
      displayEvent : {
        id: '',
        title: '',
        owner: '',
        deadline: '',
        participants: []
      },
      eventDialogVisible : false,
      events : [{id: 1,title:'a', deadline: '2019 2/2 10:11', owner: 'tanaka'},{id: 2,title:'b', deadline: '2019 2/3 10:11', owner: 'takanashi'},{id: 3,title:'c', deadline: '2019 2/4 10:11', owner: 'takai'}]
    }
  },
  async created(){
    const authHeaderBody = await makeAuthHeaderBody()
    const res = await this.$axios.get('http://localhost:3000/events', {
      headers: authHeaderBody
    }).catch((err) => {
      this.$message.error('cannot get events')
      return err.response;
    })
    if(res.status == 200){
      this.events = res.data.events
    }
  },
  methods:{
    toggleDisplayEventDialog(){
      this.eventDialogVisible = !this.eventDialogVisible
    },
    openEventDialog(eventID){
      this.getEventDetail(eventID)
      this.eventDialogVisible = !this.eventDialogVisible
    },
    getEventDetail(eventID){
      this.displayEvent.id = eventID
      this.displayEvent.title = 'po'
      this.displayEvent.owner = 'tanaka'
      this.displayEvent.deadline = 'now'
    },
    joinEvent(){
      
    }
  }
}
</script>

<style>
.event-list{
  list-style: none;
}
.el-card{
  margin-top: 10px;
}
.el-card__header{
  font-size: 20px;
}
.card-bottom{
  margin-top: 13px;
  line-height: 12px;
}
dl {
  margin: 5px;
  display: flex;
  font-size: 18px;
}
dt {
  color: #AAA;
  width: 90px;
}

dd {
  margin: 0;
}
</style>
