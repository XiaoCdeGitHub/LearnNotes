
// 获取当前时间的函数
function getDate(){
  var date =  new Date();
  var hours = date.getHours() < 10 ? '0'.toString()+date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0'.toString()+date.getMinutes() : date.getMinutes()
  return `( 数据更新 : ${hours} : ${minutes} )`
}

// 初始化股票指数的图表
function initStock(ele, color, data, title, type) {
  const chart = new G2.Chart({
    container: ele,
    height: 160,
    width: 580,
    padding: [5,80,40,120]
  });

  const daySrc = moment().format('YYYY-MM-DD HH:00:00'); // 获取当前小时

  // 根据类型初始化数据
  function initData(data, type) {
    let newData = [];
    data.forEach(item => {
      let date = moment(item.day + ' ' + item.time, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:00:00');
      if (type === 'day' && date !== daySrc) {
        return;
      }
      if (!newData.length || newData[newData.length - 1].day !== date) {
        newData.push({ day: date, open: item.open, close: item.close, high: item.high, low: item.low });
      } else {
        let last = newData[newData.length - 1];
        last.close = item.close;
        last.high = Math.max(last.high, item.high);
        last.low = Math.min(last.low, item.low);
      }
    });
    return newData;
  }

  let newData = initData(data, type);

  chart.source(newData, {
    xField: {
      type: 'cat',
      range: [0, 1]
    }
  });

  chart.scale({
    close: {
      alias: title,
      tickCount: 4,
    },
    day: {
      alias: '时间',
      tickCount: 6,
      type: 'time',
      mask: 'YYYY-MM-DD H:mm:ss',
      min: daySrc + ':00:00',
      max: moment(daySrc + ':00:00').add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    }
  });

  chart.axis('xField', {
    grid: null
  });

  chart.axis('day', {
    line: {
      lineWidth: 1,
      stroke: color,
      lineDash: [3, 3]
    },
    label : null
  });

  chart.axis('close', {
    title: {
      textStyle: {
        fontSize: 20,
        textAlign: 'center',
        fill: '#d9efff',
        rotate: 1,
      },
    },
    line: {
      lineWidth: 1,
      stroke: color,
      lineDash: [3, 3]
    },
    label: null
  });

  chart.line().position('day*close').animate({
    appear: {
      animation: 'fadeIn',
      delay: 0,
      duration: 100
    },
    enter: {
      animation: 'fadeIn',
      delay: 0,
      duration: 100
    }
  }).shape('smooth').size(5).color(color);

  chart.tooltip(false);

  chart.guide().line({
    top: true,
    start: [daySrc + ':00:00', newData[0].close],
    end: [moment(daySrc + ':00:00').add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'), newData[0].close],
    lineStyle: {
      stroke: color,
      lineWidth: 1,
      lineDash: [1, 1]
    },
    text: {
      position:  'right',
      style: {
        fill: color,
        fontSize: 16,
        fontWeight: 300
      },
      content: newData[0].close,
      offsetY: -5
    }
  });

  chart.render();

  return chart;
}

// 网点高峰提示
function siteHigh() {
  const data = [
    { year: '周一', value: 3 },
    { year: '周二', value: 3 },
    { year: '周三', value: 2 },
    { year: '周四', value: 2 },
    { year: '周五', value: 3 },
  ];
  const chart = new G2.Chart({
    container: 'model_2_3',
    width: 500,
    height: 135,
    padding: [10,50,50,50]
  });
  
  chart.source(data, {
    value: {
      max: 4,
      min: 0,
      tickCount: 4
    }
  });
  
  chart.axis('year', {
    label: {
      textStyle: {
        fill: '#d9efff',
        fontSize: 14,
        fontWeight: 300
      }
    },
    tickLine: null,
    line: {
      stroke: '#d9efff',
      lineWidth: 1
    }
  });
  
  chart.axis('value', {
    label: null,
    line: {
      stroke: '#d9efff',
      lineWidth: 1
    }
  });
  
  chart.line().position('year*value').color('#1890ff').size(2);
  
  chart.point().position('year*value').color('#1890ff').size(4).shape('circle');
  
  chart.render();
}

// 网点时段提示
function siteTime() {
  const data = [
    { time: '9:00 - 10:00', value: 3 },
    { time: '10:00 - 11:00', value: 2 },
    { time: '11:00 - 12:00', value: 1 },
    { time: '12:00 - 13:00', value: 1 },
    { time: '13:00 - 14:00', value: 2 },
    { time: '14:00 - 15:00', value: 3 },
    { time: '15:00 - 16:00', value: 4 },
    { time: '16:00 - 17:00', value: 3 },
    { time: '17:00 - 18:00', value: 2 },
    { time: '18:00 - 19:00', value: 1 },
    { time: '19:00 - 20:00', value: 1 },
    { time: '20:00 - 21:00', value: 2 },
  ];
  const chart = new G2.Chart({
    container: 'model_2_4',
    width: 500,
    height: 135,
    padding: [10,50,50,50]
  });
  
  chart.source(data, {
    value: {
      max: 4,
      min: 0,
      tickCount: 4
    }
  });
  
  chart.axis('time', {
    label: {
      textStyle: {
        fill: '#d9efff',
        fontSize: 14,
        fontWeight: 300
      }
    },
    tickLine: null,
    line: {
      stroke: '#d9efff',
      lineWidth: 1
    }
  });
  
  chart.axis('value', {
    label: null,
    line: {
      stroke: '#d9efff',
      lineWidth: 1
    }
  });
  
  chart.line().position('time*value').color('#1890ff').size(2);
  
  chart.point().position('time*value').color('#1890ff').size(4).shape('circle');
  
  chart.render();
}

// 根据日期字符串查找数据
function selectHour(day) {
  const data = [
    { day: '2023-07-10', time: '09:30:00', open: 100, close: 120, high: 130, low: 90 },
    { day: '2023-07-10', time: '10:30:00', open: 120, close: 130, high: 140, low: 110 },
    { day: '2023-07-10', time: '11:30:00', open: 130, close: 110, high: 135, low: 100 },
    { day: '2023-07-10', time: '13:30:00', open: 110, close: 140, high: 150, low: 100 },
    { day: '2023-07-10', time: '14:30:00', open: 140, close: 150, high: 160, low: 130 },
    { day: '2023-07-10', time: '15:30:00', open: 150, close: 130, high: 155, low: 120 },
    { day: '2023-07-10', time: '16:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-10', time: '17:30:00', open: 120, close: 140, high: 145,low: 115 },
    { day: '2023-07-10', time: '18:30:00', open: 140, close: 130, high: 145, low: 120 },
    { day: '2023-07-10', time: '19:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-10', time: '20:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-10', time: '21:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-10', time: '22:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-10', time: '23:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-11', time: '00:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-11', time: '01:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-11', time: '02:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-11', time: '03:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-11', time: '04:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-11', time: '05:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-11', time: '06:30:00', open: 120, close: 130, high: 135, low: 110 },
    { day: '2023-07-11', time: '07:30:00', open: 130, close: 120, high: 135, low: 110 },
    { day: '2023-07-11', time: '08:30:00', open: 120, close: 130, high: 135, low: 110 }
  ];

  // 根据日期字符串查找数据
  function findData(day) {
    return data.filter(item => item.day === day);
  }

  return findData(day);
}

// 定时器，每小时更新数据
setInterval(() => {
  const daySrc = moment().format('YYYY-MM-DD HH:00:00'); // 获取当前小时
  const data = selectHour(moment().format('YYYY-MM-DD'));
  const stockEle = document.getElementById('stock');
  stockEle.innerHTML = '';
  initStock(stockEle, '#1890ff', data, '上证指数', 'hour');
  const dateEle = document.getElementById('date');
  dateEle.innerHTML = getDate();
}, 1000 * 60 * 60); // 每小时更新一次

// 初始化股票指数的图表
const data = selectHour(moment().format('YYYY-MM-DD'));
const stockEle = document.getElementById('stock');
initStock(stockEle, '#1890ff', data, '上证指数', 'hour');
const dateEle = document.getElementById('date');
dateEle.innerHTML = getDate();

// 网点高峰提示
siteHigh();

// 网点时段提示
siteTime();

