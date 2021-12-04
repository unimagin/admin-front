<template>
  <div id="user-situation-echarts" style="width: 801px; height: 534px"></div>
</template>

<script>
import axios from 'axios'
export default {
  name: "user-situation",
  data () {
    return {
      normal: 0,
      vip: 0,
      contract: 0,
      tmp: 0
    }
  },
  methods: {
    myEcharts () {
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
              { value: this.contract, name: '签约用户' },
              { value: this.vip, name: '会员' },
              { value: this.normal, name: '普通用户' },
              { value: this.tmp, name: '临时用户' }
            ]
          }
        ]
      };

      myChart.setOption(option);
    }
  },
  mounted () {
    axios.get('/api/data/user_kind')
      .then(resp => {
        this.normal = resp.data.normal
        this.vip = resp.data.vip
        this.contract = resp.data.contract
        this.tmp = resp.data.tmp
        this.myEcharts();
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>

<style scoped>
</style>