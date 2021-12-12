<template>
  <div>
    <div>
      <h1>停车价格管理</h1>
      <el-table :data="parkPrice" style="width: 60%">
        <el-table-column label="类别" width="100" prop="label">
        </el-table-column>
        <el-table-column label="正常停车价格" width="180" prop="normalPrice">
        </el-table-column>
        <el-table-column label="超时停车价格" width="180" prop="breakPrice">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              @click="parkHandleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <h1>特殊用户管理</h1>
      <el-table :data="userPrice" style="width: 60%">
        <el-table-column label="类别" width="100" prop="label">
        </el-table-column>
        <el-table-column label="每月价格" width="180" prop="price">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              @click="userHandleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="parkDialog" title="停车价格修改" width="30%" center>
      <el-form label-width="100px" :model="parkForm">
        <el-form-item label="类别">
          <el-input v-model="parkForm.label" readonly></el-input>
        </el-form-item>
        <el-form-item label="正常停车价格">
          <el-input v-model="parkForm.normalPrice"></el-input>
        </el-form-item>
        <el-form-item label="超时停车价格">
          <el-input v-model="parkForm.breakPrice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeParkPrice">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog v-model="userDialog" title="用户价格修改" width="30%" center>
      <el-form label-width="100px" :model="userForm">
        <el-form-item label="类别">
          <el-input v-model="userForm.label" readonly></el-input>
        </el-form-item>
        <el-form-item label="正常停车价格">
          <el-input v-model="userForm.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeUserPrice">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from 'axios'
export default {
  name: "park-manage",
  data () {
    return {
      parkPrice: [],
      userPrice: [],
      parkDialog: false,
      userDialog: false,
      parkForm: {},
      userForm: {}
    }
  },
  methods: {
    parkHandleEdit (index, row) {
      this.parkForm = row
      this.parkDialog = true
    },
    userHandleEdit (index, row) {
      this.userForm = row;
      this.userDialog = true
    },
    changeParkPrice () {
      this.parkForm.normalPrice = parseFloat(this.parkForm.normalPrice)
      this.parkForm.breakPrice = parseFloat(this.parkForm.breakPrice)
      axios.post('/api/admin/change_price', { price: this.parkForm, kind: 'park' })
        .then(() => {
          ElMessage({
            message: "修改价格成功！",
            type: "success",
          });
          this.parkDialog = false
        })
        .catch(err => {
          console.log(err)
        })
    }
    ,
    changeUserPrice () {
      this.userForm.price = parseFloat(this.userForm.price)
      axios.post('/api/admin/change_price', { price: this.userForm, kind: 'user' })
        .then(() => {
          ElMessage({
            message: "修改价格成功！",
            type: "success",
          });
          this.userDialog = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    axios.get('/api/admin/look_price')
      .then(resp => {
        this.parkPrice = resp.data.parkPrice;
        this.userPrice = resp.data.userPrice
      })
  }
}
</script>

<style scoped>
</style>