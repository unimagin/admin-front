<template>
  <div id="park-situation-echarts" style="width: 801px;height: 534px;"></div>
</template>

<script>
export default {
  name: "park-situation",
  methods:{
    myEcharts(){
      var myChart = this.$echarts.init(document.getElementById('park-situation-echarts'));
      // Generate data
      var category = [];
      var dottedBase = +new Date();
      var lineData = [];
      var barData = [];

      var baseDate = +new Date(dottedBase -= 1000*3600*24*20)
      for (var i = 0; i < 20; i++) {
        var date = new Date(baseDate += 1000 * 3600 * 24);
        category.push([
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        ].join('-'));
        var b = Math.round(Math.random() * 200);
        var d = Math.round(Math.random() * 200);
        barData.push(b)
        lineData.push(d + b);
      }

      var option = {
        backgroundColor: '#080b30',
        title: {
          text: '近20天车位使用情况',
          textStyle: {
            align: 'center',
            color: '#fff',
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
              backgroundColor: '#333'
            }
          },
          formatter: '{a0}: {c0}<br />{a1}: {c1}',

        },
        legend: {
          bottom: "2%",
          itemGap: 20,
          data: ['总预约量', '实际使用量'],
          textStyle: {
            color: '#ccc',
            fontSize: 15
          }
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#ccc'
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
          data: lineData
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
                    {offset: 0, color: '#14c8d4'},
                    {offset: 1, color: '#43eec6'}
                  ]
              )
            }
          },
          data: barData
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
                      {offset: 0, color: 'rgba(20,200,212,0.5)'},
                      {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                      {offset: 1, color: 'rgba(20,200,212,0)'}
                    ]
                )
              }
            },
            z: -12,
            data: lineData
          },
          { //虚线条状图
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              normal: {
                color: '#0f375f'
              }
            },
            symbolRepeat: true,
            symbolSize: [12, 4],
            symbolMargin: 1,
            z: -10,
            data: lineData
          }]
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