$(function () {
  // 因为要使用多个echarts，需要声明很多变量，所以使用立即执行函数（同名变量不会冲突，因为立即执行函数有独立的作用域）
  // 监控区域模块制作
  (function () {
    $('.monitor .tabs').on('click', 'a', function () {
      $(this).addClass('active').siblings('a').removeClass('active');
      // $(this).index()  当前a链接的索引号
      $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
    });
    // 实现无缝滚动
    // 1、首先要克隆 marquee里面的 所有行row
    $('.marquee-view .marquee').each(function () {
      // $(this).children()  当前的marquee的孩子row
      var rows = $(this).children().clone();
      $(this).append(rows);
    })
  })();

  // 点位图模块
  (function () {
    // 1、实例化对象
    var myChart = echarts.init(document.querySelector('.pie'));
    // 2、设置 配置项和数据
    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      // 注意：颜色直接写在option下
      color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
      series: [
        {
          name: '点位统计',
          type: 'pie',
          radius: ['10%', '70%'],//如果radius是百分比则必须加引号
          center: ['50%', '50%'],
          roseType: 'radius',
          data: [
            { value: 20, name: '云南' },
            { value: 26, name: '北京' },
            { value: 24, name: '山东' },
            { value: 25, name: '河北' },
            { value: 20, name: '江苏' },
            { value: 25, name: '浙江' },
            { value: 30, name: '四川' },
            { value: 42, name: '湖北' }
          ],
          // 修饰饼形图文字相关的样式 要使用label对象（写在series里）
          label: {
            fontSize: 10
          },
          // 修饰引导线样式
          labelLine: {
            // 连接到图形的线长度
            length: 6,
            // 连接到文字的线长度
            length2: 8
          }
        }
      ]
    };
    // 3、将配置项和数据 给 实例化对象
    myChart.setOption(option);

    // 监听浏览器缩放，图表对象调用resize函数
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 用户模块--柱状图
  (function () {
    var item = {
      name: '',
      value: 1200,
      // 柱子颜色
      itemStyle: {
        color: '#254065'
      },
      // 鼠标经过柱子颜色
      emphasis: {
        itemStyle: {
          color: '#254065'
        }
      },
      // 工具提示隐藏
      tooltip: {
        extraCssText: 'opacity:0'
      },
    }
    // 1、实例化对象
    var myChart = echarts.init(document.querySelector('.bar'));
    // 2、指定配置项和数据
    var option = {
      // 修改线性渐变色方式
      color: new echarts.graphic.LinearGradient(
        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
        0, 0, 0, 1,
        [
          { offset: 0, color: '#00fffb' }, // 0 起始颜色
          { offset: 1, color: '#0061ce' }  // 1 结束颜色
        ]
      ),
      tooltip: {
        // 鼠标放在柱子上才会有提示组件
        trigger: 'item'
      },
      grid: {
        left: '0',
        right: '4%',
        bottom: '3%',
        top: '3%',
        //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
        containLabel: true,
        // 是否显示直角坐标系网格
        show: true,
        //grid 四条边框的颜色
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },
      xAxis: [
        {
          type: 'category',
          data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
          // 刻度设置
          axisTick: {
            // true意思：刻度在单个图形中间
            // false意思：图形在刻度之间
            alignWithLabel: false,

            // 不显示刻度
            show: false
          },
          // x轴文字标签样式设置
          axisLabel: {
            color: ' #4c9bfd'
          },

          // x轴的颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)'
              // opcity: 0,   如果不想显示x轴线 则改为 0
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          // 刻度设置
          axisTick: {
            // true意思：刻度在单个图形中间
            // false意思：图形在刻度之间
            alignWithLabel: false,

            // 不显示刻度
            show: false
          },
          // y轴文字标签样式设置
          axisLabel: {
            color: ' #4c9bfd'
          },

          // y轴的颜色设置
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)'
              // opcity: 0,   如果不想显示y轴线 则改为 0
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 240, 255, 0.3)'
            }
          }
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }
      ]
    };
    // 3、将配置项和数据 给 实例化对象
    myChart.setOption(option);

    // 监听浏览器缩放，图表对象调用resize函数
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 订单模块 tab栏切换
  (function () {
    var data = {
      0: { orders: '20,301,987', amount: '99834' },
      1: { orders: '301,987', amount: '9834' },
      2: { orders: '1,987', amount: '3834' },
      3: { orders: '987', amount: '834' }
    }
    // 获取显示 订单数量的容器
    var $h4Orders = $('.order h4:eq(0)');
    // 获取显示 金额总量的容器
    var $h4Amount = $('.order h4:eq(1)');
    $('.order .filter').on('click', 'a', function () {
      index = $(this).index();
      $(this).addClass('active').siblings('a').removeClass('active');
      // 对象的两种访问方式
      // 1、对象.属性    2、对象['属性']
      var currdata = data[$(this).index()];
      $h4Orders.html(currdata.orders);
      $h4Amount.html(currdata.amount);
    })
    // 自动切换tab栏动画
    var index = 0;
    var timer = setInterval(function () {
      index++;
      if (index >= 4) index = 0;
      $('.order .filter a').eq(index).click();
    }, 1000);
    // 鼠标经过 动画停止。鼠标离开 动画继续
    $('.order').hover(function () {
      clearInterval(timer);
    }, function () {
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        $('.order .filter a').eq(index).click();
      }, 1000);
    })
  })();

  // 销售模块--折线图
  (function () {
    // 准备数据（一定要放在上面）
    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ],
      quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
      ],
      month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ],
      week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    }
    // 1、实例化对象
    var myChart = echarts.init(document.querySelector('.line'));
    // 2、指定配置项和数据
    var option = {
      color: ['#00f2f1', '#ed3f35'],
      tooltip: {
        trigger: 'axis'
      },
      // 图例组件
      legend: {
        // 如果series里面有name，则legend不需要写data
        // data: ['Email', 'Union Ads'],
        textStyle: {
          color: '#4c9bfd',
        },
        right: '10%'  //图例组件距离网格右边有10%的距离
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        show: true, //显示边框
        borderColor: '#012f4a', //边框颜色
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,  //去除轴 内间距
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisTick: {
          show: false  //去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' //修改坐标标签颜色
        },
        axisLine: {
          show: false  //去除x轴线
        }
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false  //去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' //修改坐标标签颜色
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' //分割线颜色
          }
        }
      },
      series: [
        {
          type: 'line',
          // stack: 'Total',
          name: '预期销售额',
          smooth: true,  //折线是否平滑显示
          data: data.year[0]
        },
        {
          type: 'line',
          // stack: 'Total',
          name: '实际销售额',
          smooth: true,  //折线是否平滑显示
          data: data.year[1]
        }
      ]
    };
    // 3、将配置项和数据 给 实例化对象
    myChart.setOption(option);

    // 点击a，切换tab栏
    $('.sales .caption').on('click', 'a', function () {
      // 此处获取的索引号要减1，因为a的索引号是从1开始的
      index = $(this).index() - 1;
      $(this).addClass('active').siblings('a').removeClass('active');
      //console.log($('.sales .caption a').eq(index).data('type'));
      // this.dataset.type 获取标签上的data-type属性值，对应data中的属性
      // console.log(this.dataset.type);
      var currData = data[this.dataset.type];
      // 修改图表中 1线的数据
      option.series[0].data = currData[0];
      option.series[1].data = currData[1];
      // 将新的配置项和数据给实例化对象，让图表重新渲染
      myChart.setOption(option);
    })

    // 自动切换线形图数据
    var index = 0
    var timer = setInterval(function () {
      index++;
      if (index >= 4) index = 0;
      $('.sales .caption a').eq(index).click();
    }, 1000);
    // 鼠标经过 动画停止。鼠标离开 动画继续
    $('.sales').hover(function () {
      clearInterval(timer);
    }, function () {
      clearInterval(timer);
      timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        $('.sales .caption a').eq(index).click();
      }, 1000);
    })
    // 监听浏览器缩放，图表对象调用resize函数
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 渠道模块--雷达图
  (function () {
    // 1、实例化对象
    var myChart = echarts.init(document.querySelector('.radar'));
    // 2、指定配置项和数据
    var option = {
      tooltip: {
        show: true,
        // 控制提示框组件的显示位置
        position: ['60%', '10%'],
      },
      radar: {
        indicator: [
          { name: '机场', max: 100 },
          { name: '商场', max: 100 },
          { name: '火车站', max: 100 },
          { name: '汽车站', max: 100 },
          { name: '地铁', max: 100 }
        ],
        center: ['50%', '50%'],
        radius: '65%', //雷达图的大小（外半径占据容器大小）
        shape: 'circle',
        name: {
          // 修饰雷达图文本颜色
          textStyle: {
            color: '#4c9bfd'
          }
        },
        splitNumber: 4, //分割线(圆圈)的个数
        axisName: {
          color: 'rgb(238, 197, 102)'
        },
        splitLine: {
          lineStyle: {
            // 分割线的颜色
            color: 'rgba(255,255,255,.5)'
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            // 坐标轴 轴线的颜色
            color: 'rgba(255, 255, 255, 0.5)'
          }
        }
      },
      series: [
        {
          name: '北京',
          type: 'radar',
          // 填充区域的线条颜色
          lineStyle: {
            normal: {
              color: '#fff',
              width: 1,
              opacity: 0.5
            }
          },
          data: [[90, 19, 56, 11, 34]],
          // 雷达图的拐点（小圆点）
          symbol: 'circle',
          // 拐点的大小
          symbolSize: 5,
          // 拐点颜色
          itemStyle: {
            color: '#fff'
          },
          // 在圆点上显示相关数据
          label: {
            show: true,
            color: '#fff',
            fontSize: 10
          },
          areaStyle: {
            //填充区域的背景颜色
            color: 'rgba(238, 197, 102, 0.6)'
          }
        }
      ]
    };
    // 3、将配置项和数据 给 实例化对象
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用resize函数
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 销售进度模块--半圆形饼状图
  (function () {
    // 1、实例化对象
    var myChart = echarts.init(document.querySelector('.gauge'));
    // 2、指定配置项和数据
    var option = {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['130%', '150%'], //放大半圆
          center: ['48%', '80%'], //移动半圆位置，套住文字50%
          labelLine: {
            show: false
          },
          // 起始角度，支持范围[0, 360]
          startAngle: 180,
          hoverOffset: 0, //鼠标经过图形不变大
          data: [
            {
              value: 50,
              itemStyle: {
                // 颜色渐变#00c9e0->#005fc1
                color: new echarts.graphic.LinearGradient(
                  // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                    { offset: 1, color: "#005fc1" } // 1 结束颜色
                  ]
                )
              }
            },
            {
              value: 50,
              itemStyle: { color: '#12274d' }
            },
            {
              value: 100,
              // 让另一半圆形变成透明，隐藏起来
              itemStyle: { color: 'transparent' }
            },
          ]
        }
      ]
    };
    // 3、将配置项和数据给实例对象
    myChart.setOption(option);
    // 监听浏览器缩放，图表对象调用resize函数
    window.addEventListener('resize', function () {
      myChart.resize();
    })
  })();

  // 排行榜模块
  (function () {
    // 首先 要获取数据
    var hotData = [
      {
        city: '北京',  // 城市
        sales: '25, 179',  // 销售额
        flag: true, //  上升还是下降
        brands: [   //  品牌种类数据
          { name: '可爱多', num: '9,086', flag: true },
          { name: '娃哈哈', num: '8,341', flag: true },
          { name: '喜之郎', num: '7,407', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '6,724', flag: false },
          { name: '好多鱼', num: '2,170', flag: true },
        ]
      },
      {
        city: '河北',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '3,457', flag: false },
          { name: '娃哈哈', num: '2,124', flag: true },
          { name: '喜之郎', num: '8,907', flag: false },
          { name: '八喜', num: '6,080', flag: true },
          { name: '小洋人', num: '1,724', flag: false },
          { name: '好多鱼', num: '1,170', flag: false },
        ]
      },
      {
        city: '上海',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '2,345', flag: true },
          { name: '娃哈哈', num: '7,109', flag: true },
          { name: '喜之郎', num: '3,701', flag: false },
          { name: '八喜', num: '6,080', flag: false },
          { name: '小洋人', num: '2,724', flag: false },
          { name: '好多鱼', num: '2,998', flag: true },
        ]
      },
      {
        city: '江苏',
        sales: '23,252',
        flag: false,
        brands: [
          { name: '可爱多', num: '2,156', flag: false },
          { name: '娃哈哈', num: '2,456', flag: true },
          { name: '喜之郎', num: '9,737', flag: true },
          { name: '八喜', num: '2,080', flag: true },
          { name: '小洋人', num: '8,724', flag: true },
          { name: '好多鱼', num: '1,770', flag: false },
        ]
      },
      {
        city: '山东',
        sales: '20,760',
        flag: true,
        brands: [
          { name: '可爱多', num: '9,567', flag: true },
          { name: '娃哈哈', num: '2,345', flag: false },
          { name: '喜之郎', num: '9,037', flag: false },
          { name: '八喜', num: '1,080', flag: true },
          { name: '小洋人', num: '4,724', flag: false },
          { name: '好多鱼', num: '9,999', flag: true },
        ]
      }
    ]

    // 根据数据渲染各省热销 sup 模块内容
    var supHTML = '';
    $.each(hotData, function (index, item) {
      // console.log(item);  获取hotData数组里的每一项（每一个对象）
      // 拼接字符串把数据渲染到 li 的span 里面
      supHTML += `<li><span>${item.city}</span>
        <span>${item.sales} <s class=${item.flag ? 'icon-up' : 'icon-down'}></s></span></li>`;
    })
    $('.sup').html(supHTML); //将拼接好的字符串添加到dom节点(ul)上

    // 声明一个函数--设置sup当前小li高亮，并且对应brands对象同步渲染
    function load(currentEle) {
      currentEle.addClass('active').siblings().removeClass();
      var subHTML = '';
      // console.log($(this).index()); 获取hotData的索引号
      // console.log(hotData[$(this).index()]); 获取hotData里的每一个对象
      // console.log(hotData[$(this).index()].brands);获取对象里的brands属性
      // 需要遍历brands里的属性
      $.each(hotData[currentEle.index()].brands, function (index, item) {
        subHTML += `<li><span>${item.name}</span><span>${item.num} <s class=${item.flag ? 'icon-up' : 'icon-down'}></s></span></li>`;
      })
      $('.sub').html(subHTML);
    };
    // 当鼠标进入 tab 的时候
    $('.province .sup').on('mouseenter', 'li', function () {
      index = $(this).index(); //鼠标离开时，鼠标在哪里就从哪里开始
      load($(this));
    });
    // 让页面一加载 北京的数据就已经存在
    var lis = $('.province .sup li')  // 所有的LI
    // // 第一个默认激活
    lis.eq(0).mouseenter();

    // 自动切换各省的brands数据
    var index = 0;
    var timer = setInterval(function () {
      index++;
      if (index >= 5) index = 0;
      load(lis.eq(index));
    }, 2000)

    $('.province .sup').hover(
      // 鼠标经过事件
      function () {
        clearInterval(timer);
      },
      // 鼠标离开事件
      function () {
        clearInterval(timer);
        timer = setInterval(function () {
          index++;
          if (index >= 5) index = 0;
          load(lis.eq(index));
        }, 2000)
      })
  })();
})