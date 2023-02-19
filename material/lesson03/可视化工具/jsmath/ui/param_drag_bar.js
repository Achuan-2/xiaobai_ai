var scroll = document.getElementById('scroll');
var bar = document.getElementById('bar');
var mask = document.getElementById('mask');
var ptxt = document.getElementsByTagName('p')[0];
var barleft = 0;
bar.onmousedown = function(event){
  var event = event || window.event;
  var leftVal = event.clientX - this.offsetLeft;
  var that = this;
   // 拖动一定写到 down 里面才可以
  document.onmousemove = function(event){
    var event = event || window.event;
    barleft = event.clientX - leftVal;     
    if(barleft < 0)
      barleft = 0;
    else if(barleft > scroll.offsetWidth - bar.offsetWidth)
      barleft = scroll.offsetWidth - bar.offsetWidth;
    mask.style.width = barleft +'px' ;
    that.style.left = barleft + "px";
    ptxt.innerHTML = "已经走了" + parseInt(barleft/(scroll.offsetWidth-bar.offsetWidth) * 100) + "%";

    //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
  }

}
document.onmouseup = function(){
  document.onmousemove = null; //弹起鼠标不做任何操作
}