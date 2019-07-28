<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="friend-item-name">{{ friend.name }}</span>
        <div>
          <span class="friend-item-id">@{{ friend.searchID }}</span>
        </div>
      </div>
      <div class="friend-item-message">
        {{ friend.message }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
.friend-item-name {
  font-size: x-large;
}

.friend-item-id {
  font-size: smaller;
  color: gray;
}
</style>
