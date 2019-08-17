<template>
  <li>
    <el-card class="box-card">
      <div slot="header">
        <span>{{ event.title }}</span>
      </div>
      <dl>
        <dt>owner</dt>
        <dd>
          {{ event.owner }}
          <span class="owner-id">(@{{ event.ownerID }})</span>
        </dd>
        <dt>date</dt>
        <dd>{{ event.deadline }}</dd>
      </dl>
      <div class="card-bottom">
        <el-button
          type="text"
          @click="toggleDisplayEventDialog">
          詳細表示
        </el-button>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="eventDialogVisible"
      width="80%"
      @open="getEventDetail(event.id)">
      <div slot="title">
        {{ event.title }}
      </div>
      <dl>
        <dt>owner</dt>
        <dd>
          {{ event.owner }} <span class="owner-id">(@{{ event.ownerID }})</span>
        </dd>
        <dt>time</dt>
        <dd>{{ event.deadline }}</dd>
        <dt>participants</dt>
        <dd>
          {{ numOfParticipants }}
          <a 
            v-if="participants.length > 0"
            class="clickable"
            href="#"
            @click="toggleDisplayParticipants">
            (detail)
          </a>
        </dd>
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
    <el-dialog 
      :visible.sync="participantsDialogVisible"
      width="80%"
      destroy-on-close="true">
      <div slot="title">
        perticipants
      </div>
      <ul id="participants-list">
        <li 
          v-for="(participant, index) in participants"
          :key="index">
          <friend-list-item :friend="participant"/>
        </li>
      </ul>
    </el-dialog>
  </li>
</template>

<script>
import FriendListItem from './FriendListItem'
import makeAuthHeaderBody from '../../plugins/id-token'

export default {
  components: {
    FriendListItem
  },
  props: {
    event: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{
      eventDialogVisible : false,
      participantsDialogVisible : false,
      participants: []
    }
  },
  computed:{
    numOfParticipants(){
      return this.participants.length
    }
  },
  methods:{
    toggleDisplayEventDialog(){
      this.eventDialogVisible = !this.eventDialogVisible
    },
    async getEventDetail(eventID){
      // 将来的にeventIDを送って, APIサーバーからeventの詳細をもらうことを想定
      const headers = await makeAuthHeaderBody()
      const res = await this.$axios.get('http://localhost:3000/events/'+eventID, {
        headers
      }).catch((err) => {
        return err.response
      })

      if(res.status === 200){
        // ここはバックエンドと確認
        this.participants = res.participants
      }
    },
    joinEvent(){
      this.$message.success('you joined event')
    },
    toggleDisplayParticipants(){
      this.participantsDialogVisible = !this.participantsDialogVisible
    }
  }
}
</script>

<style>
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
dt {
  margin-top: 10px;
  font-weight: bold;
}
dd {
  margin: 0;
  padding-left: 20px;
}
.owner-id{
  color: #AAA
}
#participants-list{
  list-style: none;
  padding-left: 0px;
}
.el-dialog{
  max-width: 700px;
}
.clickable{
  color: inherit;
  cursor: pointer;
}
</style>
