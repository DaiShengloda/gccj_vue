const methods = {
  // 字符串截取
  subString: function(value, length) {
    if (!value) {
      return "";
    }
    value = value.trim();
    if (value.length > length) {
      var first = value.toString().substring(0, length);
      value = first + "...";
    }
    return value;
  },
  // 内容\n换成回车
  fmtContent: function(value) {
    value = value.split("\n").join("<br/>");
    return value;
  },
  // 日期字数控制
  timeNum: function(content, num) {
    if (!content) return;
    if (num < content.length) return content;
    return content.slice(0, num);
  },
  // 处理阅读数
  dealReadNum: function(value){
    value = parseInt(value);
    value = value+'';
    var len = value.length;
    if (len>4&&len<8){
        value = value.substring(0,len-4)+'.'+value.substring(len-4,len-2)+'万';
    } else if (len>7) {
        value = value.substring(0,len-8)+'.'+value.substring(len-8,len-6)+'亿';
        if (len==8){
            value = '0'+value;
        }
    }
    return value;
  },
  isSameDay: function(d1, d2) {
    return d1.toLocaleDateString() === d2.toLocaleDateString();
  },
  isSameYear: function(d1, d2) {
    return d1.getFullYear() === d2.getFullYear();
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  /**
 * 根据时间自适应显示的方式
 * 同一天只显示小时:分钟
 * 同一年显示 月-日 小时:分钟
 * 不同年显示 年-月-日 时:分
 * @param value 时间戳或者 标准格式时间(yyyy-MM-dd HH:mm) 
 */
  formatTimeLocal:function(value){
      var timestamp = parseInt(value);
      if (isNaN(timestamp)) {
          timestamp = value.replace(/-/g, '/');
      }
      let date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();

      let today = new Date();

      let timeF = [hour, minute].map(this.formatNumber).join(":");
      if (this.isSameDay(date, today)) {
          return timeF;
      }
      if (this.isSameYear(date, today)) {
          return [month, day].map(this.formatNumber).join("-") + '  ' + timeF;
      }
      return [year, month, day].map(this.formatNumber).join("-");
  },
  /**
   * 不做筛选
   * 时间戳或者 标准格式时间(yyyy-MM-dd HH:mm)
   */
  formatTimestamp: function(value){
    var timestamp = parseInt(value);
    if (isNaN(timestamp)) {
      timestamp = value.replace(/-/g, '/');
    }
    let date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    let timeF = [hour, minute].map(this.formatNumber).join(":");
    return [year, month, day].map(this.formatNumber).join("-") + ' ' + timeF;
  },

  /**
 * 将时间戳转换为日期字符串
 */
  formatTimestampToDate: function(timestamp) {
    if(!timestamp){
      return '';
    }
    let time = Number.parseInt(timestamp);
    if (isNaN(time)) {
      throw new Error('formatTimestampToDate()出错,参数类型不是时间戳');
    }
    let date = new Date();
    date.setTime(timestamp);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [year,month,day].map(this.formatNumber).join('-');
  },

  //获取地址栏参数
  getQueryString: function(name, type) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var search = window.location.search;
    if (type) {
        search = decodeURI(search);
    }
    var r = search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  // 首页推荐标签颜色匹配
  matchColor: function(hotcontents){
    var content_sign=hotcontents.content_sign
    var content_type=hotcontents.content_type
    var sign=hotcontents.sign
    var match=[
      {'text':'教育','color':'#4577dc'},
      {'text':'学堂','color':'#4577dc'},
      {'text':'课程','color':'#4577dc'},
      {'text':'策略','color':'#cdae48'},  
      {'text':'问股','color':'#ff6d1f'},
      {'text':'提示','color':'#ffa018'},
      {'text':'资讯','color':'#e83030'},
    ]
    var text,content={'text':'策略','color':'#cdae48'}
    if(content_type==4){
      content={'text':'问股','color':'#ff6d1f'}
    }else {
      for(var i in match){
        text=match[i].text
        if(text==sign){
          content=match[i]
          return content
        }
      }
    }  
    if(content_type==1){
      content=match[3]
    }
    return content
  },

}

export default{
    methods
}
