<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router>
          <el-sub-menu>
            <template #title>
              <!--            <el-icon>
                            <location/>
                          </el-icon>-->
              <span>违约情况查询</span>
            </template>
            <el-menu-item index="overallSituation">整体情况查询</el-menu-item>
            <el-menu-item index="userSituation">用户情况查询</el-menu-item>
          </el-sub-menu>
          <el-sub-menu>
            <template #title>
              <!--            <el-icon>
                            <location/>
                          </el-icon>-->
              <span>车位管理</span>
            </template>
            <el-menu-item index="parkSituation">车位情况</el-menu-item>
            <el-menu-item index="parkManager">车位管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="userManager">用户管理</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "main.vue",
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose,
    }
  },
}
</script>

<style scoped>

</style>