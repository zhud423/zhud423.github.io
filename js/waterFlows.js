//瀑布流主图库

window.onload=function(){
    sl("main-gallery-container","box");
    judgeLightSize();
};

function sl(parent,son){                 //son location函数

    //获取每行box个数c,为什么把他们放到全局变量不行?
    //var sw=gs[0].offsetWidth;         //此写法显示offsetwidth未定义
    var sw=document.getElementById("box1").offsetWidth;
    //var ww=document.body.clientWidth; //此法得到的是网页内容宽度,大于窗口宽度,内容横向溢出,有横向滚动条
    var ww=window.innerWidth;
    var c=Math.floor(ww/sw);  //取整


    var gp=document.getElementById(parent);
    //gp.style.cssText="";    想让gp宽度=sw*c,并居中显示,但会影响灯箱效果,所以放弃
    var gs=gnc(gp,son);
    var sh=[];
    for (var i=0;i<gs.length;i++) {
        if(i<c){
            sh[i] = gs[i].offsetHeight;
            //var minsh=Math.min.apply(null,sh);
            // 此句放在if里只能把超出c的第一个son元素放在需要位置,对后面的元素就失效了,此句必须放在else中
        }else {
            //用math函数找到最小值
            var minsh=Math.min.apply(null,sh);//使用Math.min(),()中为数值,不能直接跟数组,需用apply来调用数组中的数值

            //遍历得到最小值对应的序号
            function gminshsl(sh,minsh){      //get min sh son location
                for(var i in sh){
                    if (sh[i]==minsh){
                        return i;
                    }
                }
            }

            var mshl=gminshsl(sh,minsh);         //min son height location,索引值[0] [1] [2],非数值
            gs[i].style.position="absolute";
            gs[i].style.top=minsh+"px";
            gs[i].style.left=gs[mshl].offsetLeft+"px";
            //gs[i].style.left=sw*mshl+"px";
            sh[mshl]=sh[mshl]+gs[i].offsetHeight;
            //sh[mshl]=sh[mshl]+sh[i];//此处不能直接用sh[]，他是针对i<c情况
        }
    }
}

function gnc(parent,son) {                  //get need child此方法用于获取需要的子元素
    var sonarr = [];
    var allson = document.getElementsByTagName("*");
    for (var i = 0; i < allson.length; i++) {
        if (allson[i].className == son) {
            sonarr.push(allson[i]); //向数组末尾添加元素
        }
    }
    return sonarr;                   //让gnc()=sonarr[]
}


//json字符串模拟网络数据
var imgData={"data":[
    {"src":"016.jpg"},{"src":"017.jpg"},{"src":"018.jpg"},{"src":"019.jpg"},{"src":"020.jpg"}
    ,{"src":"021.jpg"},{"src":"022.jpg"},{"src":"023.jpg"},{"src":"024.jpg"},{"src":"025.jpg"}
    ,{"src":"026.jpg"},{"src":"027.jpg"},{"src":"028.jpg"},{"src":"029.jpg"},{"src":"030.jpg"}
]};

//必须通过onscroll监听滚动条,无监听直接定义,scrolltop输出始终为0
window.onscroll=function(){
    //先判断navbar固定到顶部
    if (judgeNavbar()){
        var gn=document.getElementById("navbar");
        //变量在if定义,在else不能直接用,也要定义
        //3种不同修改style的写法
        gn.style.cssText="position:fixed; top:0; width:100%; z-index:3;";
        //再判断是否加载内容
        if (judge()){  //嵌套,scrolltop>93的基础上再判断scrolltop>加载需要值
            var gp=document.getElementById("main-gallery-container");
            var t=setTimeout(ce,600);
            function ce(){
                for (var i=0;i<imgData.data.length;i++){      //要不断加载,所以循环
                    var cd=document.createElement("div");
                    cd.className="box";
                    gp.appendChild(cd);
                    //alert(cd.className);
                    var cd1=document.createElement("div");
                    cd1.className="img";
                    cd.appendChild(cd1);
                    var ca=document.createElement("a");
                    ca.href="javascript:void (0)";
                    cd1.appendChild(ca);
                    var ci=document.createElement("img");
                    ci.src="../content/life/"+imgData.data[i].src; //此处路径写法注意
                    ca.appendChild(ci);
                }
                //上一步只是加载数据,本步实现定位
                // 注意:sl()参数必须传入,否则失效
                sl("main-gallery-container","box");
            }
        }
    }else {
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
    var ch=window.screen.height;
    var gp=document.getElementById("main-gallery-container");
    var gs=gnc(gp,"box");                      //注意前面传的不是parent,为什么此时不能传参数son
    var lst=gs[gs.length-1].offsetTop+gs[gs.length-1].offsetHeight;         //last son top
    //console.log(lst);
    //console.log(st+","+ch+","+lst);
//最后一张图片距离页面顶部的高度=其到父级顶部的高度=son[son.length-1].offsettop
    //此法不行,因为用column实现的瀑布流box是乱序的,序号最后的一张图并非排在页面最后
//var gn=document.getElementsByName("box");
//    var st=document.body.scrollTop||document.documentElement.scrollTop;
//    var st1=$(window).scrollTop();
//var ch=document.body.clientHeight||document.documentElement.clientHeight;
//var lh=gn[gn.length-1].offsetTop;
    if (st>lst-ch){
        return true;
    }
}


function judgeNavbar(){
    var st=document.documentElement.scrollTop     //scroll top
        ||document.body.scrollTop
        ||window.pageYOffset
        ||window.scrollY;
    if (st>93){
        return true;
    }
}






//lightBox效果

function lightBox(){
    var gp=document.getElementById("main-gallery");
    gp.addEventListener("click",turnOn);
    var gf=document.getElementById("fade");
    gf.addEventListener("click",turnOff);

    function turnOn(){
        var ts=event.target.src;    //此步是关键,用事件委托获取到被点击的目标
        var ns=ts.slice(-6,-4);         //与substring的区别,注意起始位置是相邻两个,其实只包含一个元素
        //alert(ns);
        var cs="../content/life/0"+ns+".jpg";
        document.getElementById("imgx").src=cs;
        document.getElementById("light").style.display="block";
        document.getElementById("fade").style.display="block";
    }

    function turnOff(){
        document.getElementById("light").style.display="none";
        document.getElementById("fade").style.display="none";
    }
}


//解决手机lightbox显示问题

function judgeLightSize(){
    var gbox=gnc("main-gallery-container","box");
    console.log(gbox[2].offsetHeight);
    console.log(window.innerHeight);
    console.log(document.body.clientHeight);
    console.log(screen.height);
    if(window.innerWidth<768){         //此判断不能写在turnon函数里,它鼠标点击才触发,逻辑不对
        //document.getElementById("light").style.cssText="transform:translate(-375px,-678px)";
        for(i=0;i<gbox.length;i++){
            if (gbox[i].offsetHeight<305){
                document.getElementById("imgx").style.width=window.innerWidth*0.8+"px";
                document.getElementById("imgx").style.height="auto";
                //document.getElementById("imgx").style.cssText="width:"+window.innerWidth*0.8+"px;height"+window.innerHeight*0.6+"px";
            }else {
                document.getElementById("imgx").style.height=window.innerHeight*0.8+"px";
                document.getElementById("imgx").style.width="auto";
            }
        }
        lightBox();
    }else {
        lightBox();
    }
}



//手机端img单列显示,让box的宽度=屏幕宽度,思路不对,会让前面的sl函数执行错误
/*var sw=document.getElementById("box1").offsetWidth;
var ww=window.innerWidth;
var c=Math.floor(ww/sw);
if(c==1){
    var t=setTimeout(extend,1000);
    function extend(){
        var gimg=document.getElementsByTagName("img");
        console.log(gimg.length);
        for(i=1;i<gimg.length;i++){
            gimg[i].style.width=ww+"px";
        }
    }
}*/

//放大也不可取,会改变box的宽高,使定位函数不能正确定位
/*
function amplify(){
    var gbox=gnc("main-gallery-container","box");
    console.log(gbox);
    for(i=0;i<gbox.length;i++){
        //gbox[i].style.cssText="transform:scale(2,2)";
        //gbox[i].style.cssText="zoom:150%";

    }
}
*/


