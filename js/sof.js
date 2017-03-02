$(function(){
  //手动轮播
  $(".num li").mouseover(function(){
    $(this).addClass("active").siblings().removeClass("active");
    var index=$(this).index();
    i=index;
    //alert(index);
    $(".img li").eq(index).stop().show().siblings().stop().hide();
    //$(".img li").eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
  });

  //自动轮播
  var i=0;
  var t=setInterval(move,2000);
  //核心函数(图片向后移动)
  function move(){
    i++;
    if(i==4){
      i=0;
    }
    //alert(i);
    $(".num li").eq(i).addClass("active").siblings().removeClass("active");
    $(".img li").eq(i).stop().show().siblings().stop().hide();
    //$(".img li").eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);
    //method 1
    //$(".banner").hover(function(){
    //  clearInterval(t);
    //}, function(){
    //  t=setInterval(move,2000)
    //});

    //method 2
    //$(".banner").mouseover(function(){
    //  clearInterval(t);
    //});
    //$("#banner").mouseout(function(){
    //  t=setInterval(move,2000);
    //});

    //method 3
    $(".banner .img").mouseenter(function(){
      clearInterval(t);
    });
    $(".banner .num").mouseenter(function(){
      clearInterval(t);
    });
    $(".banner").mouseleave(function(){
      t=setInterval(move,2000);
    });
  }

  //前后箭头移动
  function movep(){         //向前移动函数
    i--;
    if(i==-1){
      i=3;
    }
    $(".num li").eq(i).addClass("active").siblings().removeClass("active");
    $(".img li").eq(i).show().siblings().hide();
  }
  $("#prev").click(function(){
    movep();
  });
  $("#next").click(function(){
    move();                //向后移动函数即核心函数
  });
});



//监听滚动,固定导航栏在顶部
window.onscroll=function(){
  if (judge()){
    //alert("ok");
    var gn=document.getElementById("navbar");
    //变量在if定义,在else不能直接用,也要定义
    //3种不同修改style的写法
     gn.style.cssText="position:fixed; top:0; width:100%; z-index:3;";

    //gn.setAttribute("style","position:fixed; top:0; width:100%; z-index:3;");

    //gn.style.position="fixed";
    //gn.style.top="0";
    //gn.style.width="100%";
  }else{
    var gn=document.getElementById("navbar");
    gn.style.position="";
    gn.style.top="";
  }
};
function judge(){
  var st=document.documentElement.scrollTop     //scroll top
      ||document.body.scrollTop
      ||window.pageYOffset
      ||window.scrollY;
  if (st>93){
    return true;
  }
}








/*
var i=0;
var number=$(".banner .img .li").number();
/!*点击向左移动*!/
$(".banner .arrow-lt").click(function(){
  i++;
  if(i==number){
    i=0;
  }
  $(".banner .img").stop().animate({left:-i*1280},500);
  $(".banner .num li").eq(i).addClass("active").sibling().removeClass("active");
});
//点击向右移动

window.onload = function() {
  var list = document.getElementById('list');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');

  function animate(offset) {
    //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
    //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
  }

  prev.onclick = function() {
    animate(600);
  };
  next.onclick = function() {
    animate(-600);
  }
};
if(newLeft<-3000){
  list.style.left = -600 + 'px';
}
if(newLeft>-600){
  list.style.left = -3000 + 'px';
}

var timer;
function play() {
  timer = setInterval(function () {
    prev.onclick()
  }, 1500)
}
play();*/
