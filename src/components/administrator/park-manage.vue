<template>
  <div>
    <div>
      停车价格管理
      <el-table :data="parkPrice" style="width: 100%">
        <el-table-column label="类别" width="100" prop="label">
        </el-table-column>
        <el-table-column label="正常停车价格" width="180" prop="normalMoney">
        </el-table-column>
        <el-table-column label="超时停车价格" width="180" prop="breakMoney">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="parkHandleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      特殊用户管理
      <el-table :data="userPrice" style="width: 100%">
        <el-table-column label="类别" width="100" prop="label">
        </el-table-column>
        <el-table-column label="每月价格" width="180" prop="price">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="userHandleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="parkDialog" title="停车价格修改" width="30%" center>
      <el-form
          label-width="100px"
          :model="parkForm"
      >
        <el-form-item label="类别">
          <el-input v-model="parkForm.label" readonly></el-input>
        </el-form-item>
        <el-form-item label="正常停车价格">
          <el-input v-model="parkForm.normalMoney"></el-input>
        </el-form-item>
        <el-form-item label="超时停车价格">
          <el-input v-model="parkForm.breakMoney"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="userDialog" title="用户价格修改" width="30%" center>
      <el-form
          label-width="100px"
          :model="userForm"
      >
        <el-form-item label="类别">
          <el-input v-model="userForm.label" readonly></el-input>
        </el-form-item>
        <el-form-item label="正常停车价格">
          <el-input v-model="userForm.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "park-manage",
  data() {
    return {
      parkPrice: [
        {
          label: '普通用户',
          normalMoney: 5,
          breakMoney: 10,
        },
        {
          label: 'VIP',
          normalMoney: 5,
          breakMoney: 10,
        },
        {
          label: '合同用户',
          normalMoney: 5,
          breakMoney: 10,
        },
      ],
      userPrice: [
        {
          label: "VIP",
          price: 120
        },
        {
          label: "合同用户",
          price: 110
        }
      ],
      parkDialog: false,
      userDialog: false,
      parkForm: {},
      userForm: {}
    }
  },
  methods: {
    parkHandleEdit(index, row) {
      this.parkForm = row
      this.parkDialog = true
    },
    userHandleEdit(index, row) {
      this.userForm = row;
      this.userDialog = true
    }
  }
}
</script>

<style scoped>

</style>