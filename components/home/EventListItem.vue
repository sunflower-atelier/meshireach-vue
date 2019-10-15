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
      <el-collapse v-model="activeNames">
        <el-collapse-item name="owner">
          <template 
            slot="title" 
            class="collapse-title">
            owner
          </template>
          <div class="collapse-body">
            <span>{{ event.owner }}</span>
          </div>
        </el-collapse-item>
        <el-collapse-item name="title">
          <template 
            slot="title" 
            class="collapse-title">
            date
          </template>
          <div class="collapse-body">
            <span>{{ event.deadline }}</span>
          </div>
        </el-collapse-item>
        <el-collapse-item name="participants">
          <template 
            slot="title" 
            class="collapse-title">
            participants
          </template>
          <div class="collapse-body">
            <ul>
              <li
                v-for="(participant, index) in participants" 
                :key="index">
                {{ participant.name }} (@{{ participant.searchID }})
              </li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <slot
        slot="footer"
        class="dialog-footer"/>
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
      participants: [],
      activeNames: ['owner','title']
    }
  },
  computed: {
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
      const res = await this.$axios.get('http://localhost:3000/events/'+eventID+'/participants', {
        headers
      }).catch((err) => {
        return err.response
      })
      if(res.status === 200){
        this.participants = res.data.participants
      }
    },
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
.el-dialog{
  max-width: 700px;
}
.clickable{
  color: inherit;
  cursor: pointer;
}
.collapse-body span{
  padding-left: 20px;
}
</style>
