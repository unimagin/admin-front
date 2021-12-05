<template>
  <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"/>
    <el-table-column property="phone" label="电话" width="130">
    </el-table-column>
    <el-table-column property="email" label="邮箱" width="160"/>
    <el-table-column property="balance" label="账户余额" width="120"/>
    <el-table-column property="violation" label="违约次数" width="120"/>
    <el-table-column property="cancel" label="取消次数" width="120"/>
    <el-table-column property="total" label="总预约次数" width="120"/>
    <el-table-column label="用户类别" show-overflow-tooltip>
      <template #default="scope">{{ showKind(scope.row.kind) }}</template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 30px;display:flex;float:left;">
    <el-button type="primary" icon="el-icon-edit"  @click="toggleSelection">加入黑名单</el-button>
  </div>
  <div style="margin-top: 30px;display:flex;">
    <el-button type="primary" icon="el-icon-delete" @click="moveBlackList" style="margin-left:40px;">移除黑名单</el-button>
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
    };
  },

  methods: {
    showKind(user_status) {
      switch (user_status) {
        case 0:
          return "普通用户";
        case 1:
          return "会员";
        case 2:
          return "合同用户";
        case 3:
          return "临时用户";
        case 4:
          return "黑名单用户";
      }
    },
    moveBlackList() {
      this.$showLoading("正在处理")
      axios.post('/api/admin/move_blacklist', {
        users: this.multipleSelection
      }).then(() => {
        this.$finishLoading()
        this.$message.success("处理成功")
        location.reload()
      }).catch(() => {
        this.$finishLoading()
        this.$message.error("处理失败")
      })
    },
    toggleSelection() {
      this.$showLoading("正在处理")
      axios.post('/api/admin/add_blacklist', {
        users: this.multipleSelection
      }).then(() => {
        this.$finishLoading()
        this.$message.success("处理成功")
        location.reload()
      }).catch(() => {
        this.$finishLoading()
        this.$message.error("处理失败")
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  created() {
    this.$showLoading("正在拼命加载")
    axios
        .get("/api/data/user_data")
        .then((resp) => {
          this.tableData = resp.data.users;
          this.$finishLoading()
        })
        .catch((err) => {
          this.$finishLoading()
        });
  },
};
</script>
<style scoped>
</style>