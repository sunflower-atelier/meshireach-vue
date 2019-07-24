<template>
  <ul>
    <li 
      v-for="event in events" 
      :key="event.id"
      class="event-list">
      <el-card class="box-card">
        <div slot="header">
          <span>{{ event.title }}</span>
        </div>
        <el-row>
          <el-col :span="12">
            募集者 : {{ event.owner }}
          </el-col>
          <el-col :span="12">
            日付 : {{ event.deadline }}
          </el-col>
        </el-row>
        <div class="card-bottom">
          <el-button type="text">
            詳細表示
          </el-button>
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return{
      events : [{id: 1,title:'a', deadline: '2019 2/2 10:11', owner: 'tanaka'},{id: 2,title:'b', deadline: '2019 2/3 10:11', owner: 'takanashi'},{id: 3,title:'c', deadline: '2019 2/4 10:11', owner: 'takai'}]
    }
  }
}
</script>>

<style>
.event-list{
  list-style: none;
}
.card-bottom{
  margin-top: 13px;
  line-height: 12px;
}
</style>
