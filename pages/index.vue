<template>
  <div id="top-view-wrapper">
    <el-tabs stretch>
      <el-tab-pane label="ダチのめし募集">
        <event-list/>
      </el-tab-pane>
      <el-tab-pane label="自分のめし募集">
        <my-event-list/>
      </el-tab-pane>
      <el-tab-pane label="ダチリスト">
        <friend-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import EventList from '../components/home/EventList'
import FriendList from '../components/home/FriendList'
import MyEventList from '../components/home/MyEventList'

export default {
  layout : 'AuthPage',
  components: {
    EventList,
    FriendList,
    MyEventList
  }
}
</script>

<style>
#top-view-wrapper {
  max-width : 800px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
}
.el-tab-pane{
  padding: 10px 15px 10px 15px;
}
</style>
