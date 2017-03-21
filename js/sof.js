window.onload=function(){
  autoBanner();
  var timerJW=setInterval(judgeWidth,200)
};

//手动轮播
  $(".num li").mouseover(function(){          //mouseover是jquery的事件
    $(this).addClass("active").siblings().removeClass("active");
    var index=$(this).index();
    i=index;
    $(".img li").eq(index).stop().show().siblings().stop().hide();
    //$(".img li").eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
  });


  //自动轮播
  var i=0;
  function autoBanner(){
    window.t=setInterval(move,2000);
  }
  //核心函数(后面图片依次向前移动)
  function move(){
    i++;
    if(i==4){
      i=0;
    }
    //alert(i);
    $(".num li").eq(i).addClass("active").siblings().removeClass("active");
    $(".img li").eq(i).stop().show().siblings().stop().hide();
    //$(".img li").eq(i).stop().fadeIn(500).siblings().stop().fadeOut(500);


    //鼠标移入暂停自动轮播,移出时恢复轮播

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
      autoBanner();
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



//手机端让banner缩小
function judgeWidth() {
  if (window.innerWidth < 768) {
    //console.log(window.innerWidth);
    clearInterval(t);
    changeBanner();
  }
}

function changeBanner(){
  $(".banner").css({
    "height":"350px"});
  $(".banner .adaptive").css({
    "margin-left": "-400px",
    "margin-top": "-175px"});
  $(".banner img").css({
    "height": "350px",
    "width": "800px"});
  //var gb=document.getElementById("banner");
  //gb.style.cssText="height:300px";
}


//banner触屏滑动效果



///监听滚动,固定导航栏在顶部
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

function judge() {
  var st = document.documentElement.scrollTop     //scroll top
      || document.body.scrollTop
      || window.pageYOffset
      || window.scrollY;
  if (st > 93) {
    return true;
  }
}






