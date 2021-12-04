<template>
  <div id="park-situation-echarts" style="width: 801px; height: 534px"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: "park-situation",
  data () {
    return {
      category: [],
      lineData: [],
      barData: [],
      dottedBase: new Date()
    }
  },
  methods: {
    myEcharts () {
      var myChart = this.$echarts.init(document.getElementById('park-situation-echarts'));
      // Generate data

      var option = {
        backgroundColor: '#fff',
        title: {
          text: '近20天车位使用情况',
          textStyle: {
            align: 'center',
            color: '#000',
            fontSize: 30,
          },
          top: '3%',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#000'
            }
          },
          formatter: '{a0}: {c0}<br />{a1}: {c1}',

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
        legend: {
          bottom: "2%",
          itemGap: 20,
          data: ['总预约量', '实际使用量'],
          textStyle: {
            color: '#000',
            fontSize: 15
          }
        },
        xAxis: {
          data: this.category,
          axisLine: {
            lineStyle: {
              color: '#000'
            }
          }
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#000'
            }
          }
        },
        series: [{//所有圆圈
          name: '总预约量',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: this.lineData
        }, {//最前方矮柱状图
          name: '实际使用量',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#14c8d4' },
                  { offset: 1, color: '#43eec6' }
                ]
              )
            }
          },
          data: this.barData
        },
        {//背后柱状图
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: 'rgba(20,200,212,0.5)' },
                  { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                  { offset: 1, color: 'rgba(20,200,212,0)' }
                ]
              )
            }
          },
          z: -12,
          data: this.lineData
        },
          //   { //虚线条状图
          //     name: 'dotted',
          //     type: 'pictorialBar',
          //     symbol: 'rect',
          //     itemStyle: {
          //       normal: {
          //         color: '#0f375f'
          //       }
          //     },
          //     symbolRepeat: true,
          //     symbolSize: [12, 4],
          //     symbolMargin: 1,
          //     z: -10,
          //     data: lineData
          //   }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted () {
    var baseDate = +new Date((this.dottedBase -= 1000 * 3600 * 24 * 20));
    for (var i = 0; i < 20; i++) {
      var date = new Date((baseDate += 1000 * 3600 * 24));
      date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      this.category.push(date);
    }
    axios.post('/api/data/bill_data', { category: this.category })
      .then(resp => {
        this.barData = resp.data.reals;
        this.lineData = resp.data.totals;
        this.myEcharts();
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
</style>