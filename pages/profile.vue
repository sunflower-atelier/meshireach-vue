<template>
  <el-container>
    <el-main>
      <div class="form-wrapper">
        <h1>プロフィール入力画面</h1>
        <el-form
          ref="form"
          :model="form"
          label-position="top"
          label-width="120px">
          <el-form-item label="名前">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="ひとこと">
            <el-input v-model="form.message"/>
          </el-form-item>
          <el-form-item label="アイコン">
            <el-upload
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              action=""
              list-type="picture-card">
              <i class="el-icon-plus"/>
            </el-upload>
            <el-dialog
              :visible.sync="form.dialogVisible">
              <img
                :src="form.dialogImageUrl"
                width="100%"
                alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onConfirm">確認</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        message: '',
        dialogImageUrl: '',
        dialogVisible: false
      }
    }
  },
  methods: {
    onConfirm() {
      this.$axios.post('http://localhost:3000/profile', {
        name: "hoge",
        message: "foo",
      })
        .then(response => {
          console.log("name=" + response.data.name);
        })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style>

</style>
