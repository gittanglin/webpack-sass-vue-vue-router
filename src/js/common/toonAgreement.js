export  default {
  /**
   * 关闭窗口
   * @param functionType 0：表示弹出提示框，然后关闭H5所在窗体   1：表示直接关闭H5窗体
   * @param flagId
   */
  closeWindow(functionType, flagId){
    let params = {
      functionType: functionType
    };
    if (flagId) {
      params.flagId = flagId;
    }
    window.location.href = "toon://mwap/window?params=" + JSON.stringify(params);
  },
  /**
   nameSpace  插件或应用的命名空间
   maxCount   可设定多选的最多数量   范围1-9张，不传默认9张
   type       是否进行图片裁剪，如果需要裁减图片 则可设定裁剪框的宽高比和值。 0：裁剪 1：不裁剪
   aspectX    裁剪框的宽高比的宽度
   aspectY    裁剪框的宽高比的高度
   xLength    裁剪框的宽度值（px）
   yLength    裁剪框的高度值（px）
   ratio      图片质量压缩率，表示压缩至原图质量的比例  0-1之间的小数（不包含0），1表示不压缩。不传默认0.1
   functionType  功能类型  1：直接从相册选择  2：填出选择框（相机 或者 相册）
   flagId  请求的唯一标示符，区别于其他调用功能。如果需要获取返回值， 则该字段必传， 且调用协议和获取返回值时传递的flagId的值必须一致。  如：当前时间的毫秒数或其他唯一值。
   */
  photo(params, callBack){
    window.location.href = "toon://mwap/photo?params=" + JSON.stringify(params);
    $.ajax({
      url: "https://127.0.0.1:6781/getResult",
      type: "POST",
      data: 'params={"flagId":' + params.flagId + '}',
      dataType: "json",
      success: function (e) {
        callBack(e);
      },
      error: function () {
        callBack('');
      }
    });
  },
  /**
   * 跳转名片页面
   * @param params feedId myFeedId
   */
  goFrame(params){
    window.location.href = "toon://frame?params=" + JSON.stringify(params);
  }
}


