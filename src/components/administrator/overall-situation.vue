<template>
  <div id="overall-situation-echarts" style="width: 801px; height: 534px"></div>
</template>

<script>
export default {
  name: "overall-situation",
  data () {
    return {
      data: [],
      dottedBase: new Date()
    }
  },
  methods: {
    myEcharts () {
      var myChart = this.$echarts.init(document.getElementById('overall-situation-echarts'));
      var option = {
        backgroundColor: '#fff',
        title: {
          text: '网站整体情况',
          textStyle: {
            align: 'center',
            color: '#000',
            fontSize: 30,
          },
          top: '4%',
          left: 'center',
        },
        legend: {
          type: 'plain',
          show: 'true',
          bottom: "3%",
          itemGap: 50,
          textStyle: {
            color: '#000',
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei',
            fontSize: 15

          }

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
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0, 0,0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(0, 0, 0,1)',
                }, {
                  offset: 1,
                  color: 'rgba(0, 0, 0,0)'
                }],
                global: false
              }
            },
          },
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '15%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true
            },
            splitArea: {
              // show: true,
              color: '#000',
              lineStyle: {
                color: '#000'
              },
            },
            axisLabel: {
              color: '#000'
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: this.data,
          },
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(0,0,0,0.1)'
              }
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: '#000',

              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {   //紫色线
            name: '用户情况',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: '#6c50f3',
                shadowColor: 'rgba(0,0,0,.3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#6c50f3',
              },
            },
            itemStyle: {
              color: '#6c50f3',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(108,80,243,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(108,80,243,0)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20,
              },
            },
            data: [12, 13, 15, 16, 18, 21],
          },
          {   //绿色线
            name: '车位情况',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 15,
            lineStyle: {
              normal: {
                color: '#00ca95',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ca95',
              },
            },

            itemStyle: {
              color: '#00ca95',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,202,149,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,202,149,0)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20,
              },
            },
            data: [10, 14, 12, 19, 15, 16],
          },
        ],
      };
      myChart.setOption(option);
    }
  },
  mounted () {
    var baseDate = +new Date((this.dottedBase -= 1000 * 3600 * 24 * 6));
    for (var i = 0; i < 6; i++) {
      var date = new Date((baseDate += 1000 * 3600 * 24));
      date = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
      this.data.push(date);
    }
    this.myEcharts();
  }
}
</script>

<style scoped>
</style>