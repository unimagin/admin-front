<template>
  <div id="user-situation-echarts" style="width: 801px;height: 534px;"></div>
</template>

<script>
export default {
  name: "user-situation",
  methods:{
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('user-situation-echarts'));

      var option = {
        title: {
          text: '用户情况',
          top: '48%',
          textAlign: 'center',
          left: '49%',
          textStyle: {
            color: '#000',
            fontSize: 25,
            fontWeight: '400',
            fontFamily: 'Microsoft YaHei',
          }
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          show: true
        },
        series: [
          {
            name: '用户情况',
            type: 'pie',
            radius: [100, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 500, name: '签约用户' },
              { value: 300, name: '集体用户' },
              { value: 400, name: '个人用户' },
              { value: 100, name: '临时用户' }
            ]
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  mounted() {
    this.myEcharts();
  }
}
</script>

<style scoped>

</style>