//js of reboxpx
var cav,painter,data,rec=new Array(),win,recname=new Array(),reccode=new Array(),defaultcode,supercode,modelcode,depot;
defaultcode="data.L=getstr2(120*5);";//cube 模式的默认代码
supercode="fourierpainter();";//super模式的默认代码
modelcode="drawcube();";//默认模式，使用cube代码。切换至"drawsuper();"，启用super模式
depot="repoxpxs1"
win={
  width:0,
  height:0,
  timed1:0,
  timed2:0,
  fps:1,
  num:0,
  rex:0,//repair x
  rey:0//repair y
}
data={
  background:"#000",
  L:"0001110111",
  width:16,
  border:2,
  lenside:20,
  row:40,
  col:15
}
window.onload=function(){
  init();
  update();
}
function init(){
  cav= $("#cav");
  win.width=$("html").width();
  win.height=$("html").height();
  cav.attr("width",win.width);
  cav.attr("height",win.height);
  painter=cav[0].getContext("2d");
  win.timed1=Number((new Date()).getTime());
  win.rex=win.width/2-data.row/2*data.lenside;
  win.rey=win.height/2-data.col/2*data.lenside;

  mbmob.init("d415957f9a356c248efd44abae44bde8","4376b51b0dcf8ec3c14db04c7a6dd4e0",depot);
  mbmob.re();//获取数据

  $("#btn-toggle").bind("click",function(){
    $("#back").slideToggle();
    $("#cav").animate({
      opacity:(1.3-$("#cav").css("opacity"))
    });
  });
}
function update(){
  eval(modelcode);
  win.timed2=Number((new Date()).getTime());
  win.num++;
  var restime=win.num*1000/win.fps;
  setTimeout("update()",win.timed1+restime-win.timed2);
}
function clearAll(){
  painter.clearRect(0,0,win.width,win.height);
}
function drawcube(){
  clearAll();
  //function which deals with the string->
  eval(defaultcode);
  //function which deals with the string-<
  var L=data.L.toString().split("");
  for(var i in L){
    if(L[i].toString()=="1"){
      var x=(i%data.row)*data.lenside;
      var y=parseInt(i/data.row)*data.lenside;
      painter.beginPath();
      painter.rect(x+win.rex,y+win.rey,data.lenside,data.lenside);
      painter.stroke();
      painter.closePath();
    }
  }
}
function drawsuper(){
  eval(supercode);
}
function downkey(keycode)
{
  //模拟键值为keycode的按键按下
  var key=new jQuery.Event("keydown");
  key.keyCode=keycode;
  //F12为123
  $("html").trigger(key);
}
function getstr2(len)
{
  //返回一个len长度的随机二进制串
  var str2="";
  for(var i=0;i<len;i++)
      str2+=(Math.random()>0.5?"0":"1");
  return str2;
}
function btn_run(){
  defaultcode=$("#form-code").val();
}
function btn_get(){
  $("#backlist").slideToggle();
  $("#cav").animate({
    opacity:(1.3-$("#cav").css("opacity"))
  });
}
function btn_save(){
  if($("#form-filename").val()=="default"){alert("受限制的文件名");return 0;}
  mbmob.set("name",$("#form-filename").val());
  mbmob.set("code",$("#form-code").val());
  //重置，防止重值
  mbmob.init("d415957f9a356c248efd44abae44bde8","4376b51b0dcf8ec3c14db04c7a6dd4e0",depot);
  mbmob.acq = new Bmob.Query(mbmob.ac);
}
function btn_switch(){
  if(depot=="repoxpxs1"){
    $("#btn-switch").text("切换至cube模式");
    switchof2();
  }else{
    $("#btn-switch").text("切换至super模式");
    switchof1();
  }
}
function getafile(e){
  var codeindex=recname.indexOf(e);
  if(e==-1){
    alert("找不到这个文件");
    return 0;
  }
  console.log("loading "+recname[codeindex]+" as defaultcode which is running");
  $("#form-filename").val(recname[codeindex]);
  if(depot=="repoxpxs1"){
    defaultcode=reccode[codeindex];
    $("#form-code").val(defaultcode);
  }else{
    supercode=reccode[codeindex];
    $("#form-code").val(reccode[codeindex]);
  }
  (depot=="repoxpxs1")?defaultcode=reccode[codeindex]:supercode=reccode[codeindex];
  $("#form-code").val(reccode[codeindex]);
}
function closewin(w){
  $(w).slideToggle();
  $("#cav").animate({
    opacity:1
  });
}
function switchof1(){
  modelcode="drawcube();";
  depot="repoxpxs1";
  mbmob.init("d415957f9a356c248efd44abae44bde8","4376b51b0dcf8ec3c14db04c7a6dd4e0",depot);
  mbmob.re();
  win.fps=1;
  win.timed1=Number((new Date()).getTime());
  win.num=0;
  console.log(win.num);
}
//fourier realize javascript
//by 还搞不懂分析和级数的什锦
//当时参考了大神的文章，地址忘了，很好搜的
//fourier realize javascript
var canvas,fpainter,startime;
var pi=Math.PI;
var lica=1;//指数
var hc=20;//100%高度代表的数学高度
var tc=0.1;//时间缩放比
var oxy=1;//分解方向
function switchof2(){
  modelcode="drawsuper();";
  depot="repoxpxs2";
  canvas=document.getElementById("cav");
  fpainter=canvas.getContext("2d");
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  mbmob.init("d415957f9a356c248efd44abae44bde8","4376b51b0dcf8ec3c14db04c7a6dd4e0",depot);
  mbmob.re();
  win.fps=50;
  lica=8;
  startime=new Date().getTime();
  win.timed1=Number((new Date()).getTime());
  win.num=0;
  console.log(win.num);
}
function fourierpainter(){
  clearAll();
  draw5(lica);
  draw6(lica);
}
function draw5(cmax)
{
  fpainter.beginPath();
  fpainter.lineWidth=1;
  for(var x=0;x<canvas.width;x++)
  {
    var t=(((new Date().getTime())-startime)/1000+x/canvas.height*hc)*tc;
    var y=0;
    for(var i=oxy;i<=cmax;i+=2)
    {
      y+=4/(pi*i)*Math.sin(2*pi*t*i);
    }
    y=y*canvas.height/hc+canvas.height/2;
    //4*(pi*1)^(-1)*sin(2*pi*t*i),i取1,3,5...西格玛
    fpainter.lineTo(x,y);
  }
  fpainter.strokeStyle="rgba(231, 76, 60,1)";
  fpainter.stroke();
  fpainter.closePath();
}
function draw6(cmax)
{
  var oxx=canvas.width/2;
  var oyy=canvas.height/2;
  var ox=0;
  var oy=0;
  var xx=0;
  var yy=0;
  for(var i=oxy;i<=cmax;i+=2)
  {
    var r=4/(pi*i)*canvas.height/hc;
    //r=4*(pi*i)^(-1)
    var p=((((new Date().getTime())-startime)/1000+oxx/canvas.height*hc)*tc)*i*2*pi;
    //p=2*pi*t*i,i取1,3,5...，西格玛
    xx=r*Math.cos(p);
    xx=ox+xx;
    yy=r*Math.sin(p);
    yy=oy+yy;
    //canvas start
    fpainter.beginPath();
    fpainter.lineWidth=2;
    fpainter.strokeStyle="rgba(230, 126, 34,0.5)";
    fpainter.arc(ox+oxx,oy+oyy,r,0,2*pi,true);
    fpainter.stroke();
    fpainter.moveTo(ox+oxx,oy+oyy);
    fpainter.lineTo(xx+oxx,yy+oyy);
    fpainter.stroke();
    fpainter.closePath();
    //canvas stop
    ox=xx;
    oy=yy;
  }
  //canvas start
  fpainter.beginPath();
  fpainter.lineWidth=1;
  fpainter.strokeStyle="rgba(52, 152, 219,1.0)";
  fpainter.moveTo(oxx-canvas.height/hc/tc,yy+oyy);
  fpainter.lineTo(oxx+canvas.height/hc/tc,yy+oyy);
  fpainter.stroke();
  fpainter.closePath();
  //canvas stop
}
