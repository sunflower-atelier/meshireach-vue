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
        <dl>
          <dt>
            owner
          </dt>
          <dd>
            {{ event.owner }}
          </dd>
        </dl>
        <dl>
          <dt>
            date
          </dt>
          <dd>
            {{ event.deadline }}
          </dd>
        </dl>
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
import makeAuthHeaderBody from '../plugins/id-token'

export default {
  data() {
    return{
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
      // event listを処理する
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
