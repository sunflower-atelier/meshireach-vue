<template>
  <li>
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
          @click="openEventDialog()">
          詳細表示
        </el-button>
      </div>
    </el-card>
    <el-dialog 
      :visible.sync="eventDialogVisible"
      @open="getEventDetail(event.id)">
      <div slot="title">
        {{ event.title }}
      </div>
      <dl>
        <dt>owner</dt>
        <dd>{{ event.owner }}</dd>
      </dl>
      <dl>
        <dt>time</dt>
        <dd>{{ event.deadline }}</dd>
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
  </li>
</template>

<script>
export default {
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
    }
  },
  methods:{
    toggleDisplayEventDialog(){
      this.eventDialogVisible = !this.eventDialogVisible
    },
    openEventDialog(){
      this.eventDialogVisible = !this.eventDialogVisible
    },
    getEventDetail(eventID){
      console.log(eventID)
    },
    joinEvent(){
      this.$message.success('you joined event')
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
