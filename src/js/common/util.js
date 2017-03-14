import {Indicator, Toast, MessageBox} from "mint-ui";
import config from "./config";

export default {
  /**
   *post请求
   * @param confObj
   * @param callBack
   */
  post(confObj, callBack) {
    if (typeof confObj == "undefined") {
      confObj = {};
    }
    var defConf = {
      supportCors: true,
      commonUrl: config.comUrl,
      needJson: true,
      url: "",
      data: {},
      timeout: 50000,
      async: true,
      crossDomain: true,
      showIndicator: true,
      contentType: "application/json; charset=utf-8",
      success: function (data) {
      },
      error: function (xml, XMLHttpRequest, errMsg, e) {
        return false;
      }
    };
    var setting = $.extend(true, defConf, confObj);
    if (!setting.url) {
      return false;
    }
    if (defConf.showIndicator) {
      Indicator.open({
        spinnerType: 'fading-circle'
      });
    }
    $.ajax({
      url: (setting.commonUrl ? setting.commonUrl : config.comUrl) + setting.url,
      data: setting.needJson ? JSON.stringify(setting.data) : setting.data,
      type: "post",
      dataType: "json",
      async: setting.async,
      timeout: setting.timeout,
      headers: setting.headers,
      success: (response)=> {
        if (defConf.showIndicator) {
          Indicator.close();
        }
        callBack(JSON.parse(response))
      },
      error: (response)=> {
        if (defConf.showIndicator) {
          Indicator.close();
        }
        callBack(response)
      }
    });
  },
  /**
   *get请求
   * @param confObj
   * @param callBack
   */
  get(confObj, callBack) {
    if (typeof confObj == "undefined") {
      confObj = {};
    }
    var defConf = {
      supportCors: true,
      commonUrl: null,
      url: "",
      data: {},
      timeout: 50000,
      async: true,
      crossDomain: true,
      cache: false,
      showIndicator: true,
      headers: {
        Accept: "application/json; charset=utf-8"
      },
      success: function () {
      },
      error: function (xml, XMLHttpRequest, errMsg, e) {
      }
    };
    var setting = $.extend(true, defConf, confObj);
    if (!setting.url) {
      return false;
    }
    if (defConf.showIndicator) {
      Indicator.open({
        spinnerType: 'fading-circle',
      });
    }
    $.ajax({
      url: (setting.commonUrl ? setting.commonUrl : config.comUrl) + setting.url,
      data: setting.data,
      type: "get",
      dataType: "JSON",
      async: setting.async,
      timeout: setting.timeout,
      headers: setting.headers,
      success: (response)=> {
        if (defConf.showIndicator) {
          Indicator.close();
        }
        callBack(JSON.parse(response))
      },
      error: (response)=> {
        if (defConf.showIndicator) {
          Indicator.close();
        }
        callBack(response)
      }
    });
  },
  /**
   * 对象继承
   * @param des
   * @param src
   * @param override
   * @returns {*}
   */
  extendObj(des, src, override){
    if (src instanceof Array) {
      for (var i = 0, len = src.length; i < len; i++)
        this.extendObj(des, src[i], override);
    }
    for (var i in src) {
      if (override || !(i in des)) {
        des[i] = src[i];
      }
    }
    return des;
  },
  /**
   * 设置导航条信息
   */
  setTitle(title) {
    if (!title) return;
    document.title = title;
    try {
      setTitle(title);
    } catch (e) {
    }
  },
  /**
   * 获取指定地址栏参数
   * @param name
   * @returns {*}
   */
  getQueryStringByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  },
  /**
   * 替换表情
   */
  utf16toEntities(str) {
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
    str = str.replace(patt, function (char) {
      var H, L, code;
      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位
        L = char.charCodeAt(1); // 取出低位
        code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
        //return "&#" + code + ";";
        return "";
      } else {
        return char;
      }
    });
    return str;
  },
  /**
   * 数组去重
   * @param array
   * @returns {Array}
   */
  uniqueArray(array) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
      for (var j = i + 1; j < l; j++)
        if (array[i] === array[j]) j = ++i;
      r.push(array[i]);
    }
    return r;
  },
  /**
   * 加载提示框
   * @param msg
   */
  indicator(msg, className){
    Indicator.open({
      text: msg,
      spinnerType: className ? className : 'fading-circle'
    });
    setTimeout(() => {
      Indicator.close();
    }, config.indicatorTime);
  },
  /**
   *弹框提示
   */
  toast(msg){
    let instance = Toast(msg);
    setTimeout(() => {
      instance.close();
    }, config.toastTime);
  },
  /**
   * 确认框
   * @param msg
   */
  messageBox(msg, callBack){
    MessageBox.confirm(msg).then(action => {
      callBack(action)
    });
  },
  /**
   * 保存滚动条位置
   * @param name
   * @param scrollY
   */
  saveScroll(_this){
    sessionStorage.setItem(_this.$route.name, window.scrollY);
  },
  /**
   * 回到滚动条位置的地方
   * @param name
   */
  scrollTo(_this){
    window.scrollTo(0, sessionStorage.getItem(_this.$route.name) ? sessionStorage.getItem(_this.$route.name) : 0);
  }
}


