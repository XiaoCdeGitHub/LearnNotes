let nowDay = moment().format('YYYY-MM-DD ')
// 外汇
foreign_exchange()
function foreign_exchange(){

  $.get('http://127.0.0.1:7030/ftc/foreign_exchange',function (data) {

    $('#foreignDate').text(getDate())
    if(window.foreignTimer) clearInterval(window.foreignTimer)

    var newData = []
    for(let a=0;a<data.length;a++){
      if(data[a].currency_name.indexOf('哈萨克斯坦') === -1 && data[a].currency_name.indexOf('巴基斯坦') === -1){
        newData.push(data[a])
      }
    }

    let str = `<table class="table-style-2">
              <tr>
                <th>币种</th>
                <th>现汇买入价</th>
                <th>现汇卖出价</th>
                <th>现钞买入价</th>
                <th>现钞卖出价</th>
              </tr>`

    for(let i=0;i<newData.length;i++){
      str += `
        <tr class="foreign-item foreign-${i+1} animated fadeIn ${i > 0 ? 'hide':''}">
          <td>${newData[i].currency_name}</td>
          <td class="counter" data-counter-time="500" data-counter-delay="50">${newData[i].Per}</td>
          <td class="counter" data-counter-time="1000" data-counter-delay="50">${newData[i].ExchBid}</td>
          <td class="counter" data-counter-time="1500" data-counter-delay="50">${newData[i].ExchOffer}</td>
          <td class="counter" data-counter-time="2000" data-counter-delay="50">${newData[i].CashBid}</td>
        </tr>
      `
    }

    str += `</table>`

    $('#dataForeign').html(str)

    var foreign_id = 1
    window.foreignTimer = setInterval(function () {
      $('.foreign-item').hide()
      foreign_id ++
      if(foreign_id === data.length){
        foreign_exchange()
      }else{
        $('.foreign-'+foreign_id).show()
        $('.foreign-'+foreign_id+' .counter').countUp();
      }
    },10000)

  },'json')

}

// 外币存款利率
rate()
function rate(){

  $.get('http://127.0.0.1:7030/ftc/rate',function (data) {

    $('#rateDate').text(getDate())
    if(window.rateTimer) clearInterval(window.rateTimer)

    let str = ''
    let ID = 0

    for(let i=0;i<data.length;i++){

      if(i%2!==0){
        continue
      }

      ID ++

      var a1 = data[i]
      var a2 = data[i+1] ? data[i+1] : ''

      str += `<div class="item-style-1 animated flipInX rate-item rate-${ID} ${i < 2 ? '':'hide'}">
                <div class="t1">${a1.title}</div>
                <div class="t2"><span class="counter" data-counter-time="1000" data-counter-delay="50">${a1.huoqi}</span>%</div>
              </div>`
      if(a2){
        str += `<div class="item-style-1 animated flipInX rate-item rate-${ID} ${i < 2 ? '':'hide'}">
                <div class="t1">${a2.title}</div>
                <div class="t2"><span class="counter" data-counter-time="1000" data-counter-delay="50">${a2.huoqi}</span>%</div>
              </div>`
      }

    }

    $('#dataRate').html(str)

    var autoID = 1
    window.rateTimer = setInterval(function () {
      $('.rate-item').hide()
      autoID ++
      if(autoID === (ID+1)){
        rate()
      }else{
        $('.rate-' + autoID ).show()
        $('.rate-' + autoID + ' .counter').countUp();
      }
    },10000)

  },'json')

}

// 基金
fund()
function fund() {

  $.get('http://127.0.0.1:7030/ftc/fund',function (data) {

    $('#randDate').text(getDate())
    if(window.fundTimer) clearInterval(window.fundTimer)

    let str = ''
    let ID = 0

    for(let i=0;i<data.length;i++){

      if(i%2!==0){
        continue
      }

      ID ++

      var a1 = data[i]
      var a2 = data[i+1] ? data[i+1] : ''

      str += `<div class="con fund-item fund-${ID} ${i > 0 ? 'hide':''}">`

        str += `<div class="item animated flipInX">
                  <span class="count">${i+1}</span>
                  <span class="name">${a1.type} ${a1.fundName}</span>
                  <span class="value">${a1.gain}</span>
                </div>`
        if(a2){
          str += `<div class="item animated flipInX" style="-webkit-animation-delay: .3s;">
                  <span class="count">${i+2}</span>
                  <span class="name">${a2.type} ${a2.fundName}</span>
                  <span class="value">${a2.gain}</span>
                </div>`
        }

      str += `</div>`

    }

    $('#dataFund').html(str)

    var autoID = 1
    window.fundTimer = setInterval(function () {
      $('.fund-item').hide()
      autoID ++
      if(autoID === (ID+1)){
        fund()
      }else{
        $('.fund-' + autoID ).show()
      }
    },10000)

  },'json')

}

// 理财
financial()
function financial() {

  $.get('http://127.0.0.1:7030/ftc/financial',function (data) {

    $('#financialDate').text(getDate())
    if(window.financialTimer) clearInterval(window.financialTimer)

    let str = ''

    for(let i=0;i<data.length;i++){

      str += `<table class="table-style-3 money2-item money2-${i+1} animated flipInX ${i > 0 ? 'hide':''}">
                <tr>
                  <th colspan="4">
                    <span class="title">${data[i].name}</span>
                  </th>
                </tr>
                <tr>
                  <td><span class="t1">业绩比较基准</span><span class="t2 rad">${data[i].year_income_rate}</span></td>
                  <td><span class="t1">起购金额</span><span class="t2">${data[i].limit_price}</span></td>
                  <td><span class="t1">期限</span><span class="t2">${data[i].date_limit}天</td>
                  <td><span class="t1">产品风险等级</span><span class="t2"><img src="img/level${data[i].grade}.png" /></span></td>
                </tr>
              </table>`

    }

    $('#dataFinancial').html(str)

    var autoID = 1
    window.financialTimer = setInterval(function () {
      $('.money2-item').hide()
      autoID ++
      if(autoID === data.length){
        financial()
      }else{
        $('.money2-'+autoID).show()
      }
    },10000)

  },'json')

}

// 账户贵金属
metal()
function metal() {

  $.get('http://127.0.0.1:7030/ftc/metal',function (data) {

    $('#metalDate').text(getDate())
    if(window.metalTimer) clearInterval(window.metalTimer)

    if(data && Array.isArray(data)){

      let str = ''
      let ID = 0

      for(let i=0;i<2;i++){

        ID ++

        str += `<div class="metal-item metal-item-${ID} ${i > 0 ? 'hide':''}">`

        let startI = i*4
        for(let a=startI;a<i*4+4;a++){

          str += `<div class="item animated flipInX">
                <div class="title-warp"><div class="title ${data[a].upordown == 1 ? 'up':'down'}">${data[a].metalname}</div></div>
                <div class="left"><span class="value counter" data-counter-time="1000" data-counter-delay="50">${data[a].buyprice}</span></div>
                <div class="right"><span class="value counter" data-counter-time="1000" data-counter-delay="50">${data[a].sellprice}</span></div>
              </div>`

        }

        str += `</div>`

      }

      $('#dataMeta').html(str)

      var autoID = 0
      var updateCount = 1
      window.metalTimer = setInterval(function () {
        $('.metal-item').hide()
        updateCount ++
        autoID ++
        // console.log('autoID:'+autoID+' updateCount:'+updateCount)
        if(updateCount === 10){
          metal()
        }else{
          $('.metal-item-' + autoID ).show()
          $('.metal-item-' + autoID + ' .counter').countUp();
          if(autoID === 2){
            autoID = 0
          }
        }
      },10000)

    }else{

      setTimeout(function () {

        metal()

      },5000)

    }




  },'json')

}

// 上证指数总览
stock()
function stock() {

  $.get('http://127.0.0.1:7030/ftc/stock',function (data) {

    $('#stockDate').text(getDate())
    var a = parseFloat(data[0].amount) > 0 ? "+"+data[0].amount : data[0].amount
    var b = parseFloat(data[0].percentage) > 0 ? "+"+data[0].percentage : data[0].percentage
    $('.stock-0').text(data[0].point)
    $('.stock-1').text(a)
    $('.stock-2').text(b+'%')

    $('.model-1 .animated').hide()

    setTimeout(()=> $('.model-1 .animated').show() ,10)

    setTimeout(()=>stock(),30000)

  },'json')

}

// 上证指数
shang_history()
function shang_history() {

  $.get('http://127.0.0.1:7030/ftc/shang_history',function (data) {
    let ele = initStock('model_2_1','#00b4b1',data,'上证指数',1)
    update(ele)
  },'json')

  function update(ele){
    setTimeout(function () {
      $.get('http://127.0.0.1:7030/ftc/shang_history',function (data) {

        ele.changeData(initData(data,1))
        update(ele)

      },'json')
    },60000)
  }
}

// 深证指数
shen_history()
function shen_history() {

  $.get('http://127.0.0.1:7030/ftc/shen_history',function (data) {
    let ele = initStock('model_2_2','#f05c26',data,'深证指数',2)
    update(ele)
  },'json')

  function update(ele){
    setTimeout(function () {
      $.get('http://127.0.0.1:7030/ftc/shen_history',function (data) {

        ele.changeData(initData(data,'2'))
        update(ele)

      },'json')
    },60000)
  }

}
//按天数更新
/* function initData(data,_type){
  var daySrc = moment().format('YYYY-MM-DD ') //"2020-01-13 "
  var newData = []
  // 天数切换后刷新数据
  if(nowDay !== daySrc){
    location.reload()
    return
  }
  // 测试开始
  // 判断今天有数据
  if(data[data.length-1].day.indexOf(daySrc) !== -1){
    // 返回全部日期
    let dayArr = []
    for (let i=0;i<data.length;i++){
      if(dayArr.indexOf(data[i].day.slice(0,10)) === -1){
        dayArr.push(data[i].day.slice(0,10))
      }
    }
    // 第一条数据
    if(dayArr.length === 2){
      newData = [{day: daySrc+"09:30:00", close: parseFloat(selectDay(data,dayArr[0]+' 15:00:00').close)}]
    }
    if(dayArr.length === 3){
      newData = [{day: daySrc+"09:30:00", close: parseFloat(selectDay(data,dayArr[1]+' 15:00:00').close)}]
    }
    for (let i=0;i<data.length;i++){
      let d = data[i]
      // 返回今天数据 排除之前时间数据
      if(new Date(d.day).getTime() > new Date(daySrc+"09:00:00").getTime()){
        // 大于11:30 减去1个半小时
        if(new Date(d.day).getTime() > new Date(daySrc+"11:30:00").getTime()){
          d.day = moment(d.day).subtract(1.5, "hour").format("YYYY-MM-DD H:mm:ss")
        }
        d.close = parseFloat(d.close)
        newData.push(d)
      }
    }
  }else{
    // 显示上个交易日收盘信息
    newData = [{day: daySrc+"09:30:00", close: parseFloat(data[data.length-1].close)}]
  }
  return newData
} */

//按小时更新
function initData(data, _type) {
  var hourSrc = moment().format('YYYY-MM-DD HH:00:00') //"2020-01-13 09:00:00"
  var newData = []
  // 测试开始
  // 返回最近一天的数据
  for (let i = data.length - 1; i >= 0; i--) {
    let d = data[i]
    if (d.day.indexOf(hourSrc.slice(0, 13)) !== -1) {
      if (new Date(d.day).getTime() >= new Date(hourSrc).getTime()) {
        newData.unshift(d)
      }
    }
  }
  return newData
}

function selectDay(data,str) {
  for (let i=0;i<data.length;i++){
    if(data[i].day === str){
      return data[i]
    }
  }
}

function initStock(ele,color,data,title,type){

  // var daySrc = moment().format('YYYY-MM-DD ') //"2020-01-13 "

  const daySrc = moment().format('YYYY-MM-DD HH:00:00'); // 获取当前小时
  let newData = initData(data,type)

  // console.log(newData)

  const chart = new G2.Chart({
    container: ele,
    height: 160,
    width: 580,
    padding: [5,80,40,120]
  })
  chart.source(newData,{
    xField: {
      type: 'cat',
      range: [ 0, 1 ]
    }
  });
  chart.scale({
    close: {
      alias: title,
      tickCount: 4,
      // min: newData[0].close - 30,
      // max: newData[0].close + 30
    },
    day: {
      alias: '时间',
      tickCount: 6,
      type: 'time',
      mask: 'YYYY-MM-DD H:mm:ss',
      min: daySrc + "9:30:00",
      max: daySrc + "13:30:00",
    }
  });
  chart.axis('xField', {
    grid: null
  });

  chart.axis('day', {
    line: {
      lineWidth: 1, // 设置线的宽度
      stroke: color, // 设置线的颜色
      lineDash: [ 3, 3 ] // 设置虚线样式
    },
    label : null
  });
  chart.axis('close', {
    title: {
      textStyle: {
        fontSize: 20, // 文本大小
        textAlign: 'center', // 文本对齐方式
        fill: '#d9efff', // 文本颜色
        rotate: 1,
      },
    },
    line: {
      lineWidth: 1, // 设置线的宽度
      stroke: color, // 设置线的颜色
      lineDash: [ 3, 3 ] // 设置虚线样式
    },
    label: null
  });
  chart.line().position('day*close').animate({
    appear: {
      animation: 'fadeIn', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 100 // 动画执行时间
    },
    enter: {
      animation: 'fadeIn', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 100 // 动画执行时间
    }
  }).shape('smooth').size(5).color(color)
  chart.tooltip(false);
  chart.guide().line({
    top: true,
    start: [ daySrc + '09:30:00', newData[0].close ],
    end: [ daySrc + '13:30:00', newData[0].close ],
    lineStyle: {
      stroke: color,
      lineWidth: 1,
      lineDash: [ 1, 1 ]
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

  return chart

}

// 网点高峰提示
siteHigh()
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
  chart.source(data);
  chart.scale('value', {
    min: 0,
    tickCount: 3
  });
  chart.scale('year', {
    range: [ 0, 1 ]
  });

  chart.tooltip({
    crosshairs: {
      type: 'line'
    }
  });

  chart.axis('year', {
    line: {
      lineWidth: 1, // 设置线的宽度
      stroke: '#657ca8', // 设置线的颜色
      lineDash: [ 3, 3 ] // 设置虚线样式
    },
    label: {
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fill: '#657ca8', // 文本的颜色
        fontSize: '18', // 文本大小
        fontWeight: 'bold', // 文本粗细
        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
      }
    }
  });
  chart.axis('value', {
    label: null
  });

  chart.line().position('year*value').size(6).shape('circle').animate({
    appear: {
      animation: 'clipIn', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 1000 // 动画执行时间
    },
    enter: {
      animation: 'clipIn', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 1000 // 动画执行时间
    }
  })
    .style({
      stroke: '#fff',
      lineWidth: 1
    }).color('#f05c26')
  chart.point().position('year*value').size(6).shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1
    }).color('#f05c26')
  chart.render();

  chart.render();

  setInterval(function () {
    chart.changeData([]);chart.changeData(data)
  },5000)
}

// 网点时段提示
siteTimeHigh()
function siteTimeHigh() {
  const data = [
    { year: '9:00-10:00', value: 1 },
    { year: '10:00-11:30', value: 2 },
    { year: '11:30-14:00', value: 2 },
    { year: '14:00-15:00', value: 1 },
    { year: '15:00-16:00', value: 2 },
    { year: '16:00-17:00', value: 2 },
  ];
  const chart = new G2.Chart({
    container: 'model_2_4',
    width: 700,
    height: 135,
    padding: [10,60,50,60]
  });
  chart.source(data);
  chart.scale('value', {
    min: 0,
    tickCount: 3
  });
  chart.scale('year', {
    range: [ 0, 1 ]
  });
  chart.tooltip({
    crosshairs: {
      type: 'line'
    }
  });
  chart.axis('year', {
    line: {
      lineWidth: 1, // 设置线的宽度
      stroke: '#657ca8', // 设置线的颜色
      lineDash: [ 3, 3 ] // 设置虚线样式
    },
    label: {
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start middle end
        fill: '#657ca8', // 文本的颜色
        fontSize: '18', // 文本大小
        fontWeight: 'bold', // 文本粗细
        textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
      }
    }
  });
  chart.axis('value', {
    label: null
  });

  chart.interval().position('year*value').shape('circle')
    .style({
      stroke: '#fff',
      lineWidth: 1
    }).color('#00b4b1').animate({
    appear: {
      animation: 'scaleInY', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 1000 // 动画执行时间
    },
    enter: {
      animation: 'scaleInY', // 动画名称
      delay: 0, // 动画延迟执行时间
      duration: 1000 // 动画执行时间
    }
  })

  chart.render();

  setInterval(function () {
    chart.changeData([]);chart.changeData(data)
  },5000)
}

function getDate(){
  var date =  new Date();
  var hours = date.getHours() < 10 ? '0'.toString()+date.getHours() : date.getHours()
  var minutes = date.getMinutes() < 10 ? '0'.toString()+date.getMinutes() : date.getMinutes()
  return `( 数据更新 : ${hours} : ${minutes} )`
}