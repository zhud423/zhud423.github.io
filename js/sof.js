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
    //$(".banner").hover(function(){
    //  clearInterval(t);
    //}, function(){
    //  t=setInterval(move,2000)
    //});
    $(".banner").mouseover(function(){
      clearInterval(t);
    });
    $(".banner .img").mouseout(function(){
      t=setInterval(move,2000);
    });
   /* $(".banner").mouseenter(function(){
      clearInterval(t);
    });
    $(".banner .img").mouseleave(function(){
      t=setInterval(move,2000);
    });*/
  }

  //前后箭头
  //向前移动函数
  function movep(){
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
    move();//用核心函数就行
  });
});









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
