<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="phone" label="电话" width="130">
    </el-table-column>
    <el-table-column property="email" label="邮箱" width="160" />
    <el-table-column property="balance" label="账户余额" width="120" />
    <el-table-column property="violation" label="违约次数" width="120" />
    <el-table-column property="cancel" label="取消次数" width="120" />
    <el-table-column property="total" label="总预约次数" width="120" />
    <el-table-column label="用户类别" show-overflow-tooltip>
      <template #default="scope">{{ showKind(scope.row.kind) }}</template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])"
      >Toggle selection status of second and third rows</el-button
    >
    <el-button @click="toggleSelection()">Clear selection</el-button>
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
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  created() {
    axios
      .get("/api/data/user_data")
      .then((resp) => {
        this.tableData = resp.data.users;
        console.log(this.tableData);
      })
      .catch((err) => [console.log(err)]);
  },
};
</script>
<style scoped>
</style>