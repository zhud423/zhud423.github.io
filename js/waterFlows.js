//瀑布流主图库

window.onload=function(){
    sl("main-gallery-container","box");
};

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

function sl(parent,son){                 //son location函数
    var gp=document.getElementById(parent);
    var gs=gnc(gp,son);
    //var sw=gs[0].offsetWidth;         //此写法显示offsetwidth未定义
    var sw=document.getElementById("box1").offsetWidth;
    //var ww=document.body.clientWidth; //此法得到的是网页内容宽度,大于窗口宽度,内容横向溢出,有横向滚动条
    var ww=window.innerWidth;
    var c=Math.floor(ww/sw);  //取整
    gp.style.cssText="width:"+sw*c+"px;margin:0 auto;";//固定居中化后跟bootstrap的自适应冲突
    var sh=[];
    for (var i=0;i<gs.length;i++) {
        if(i<c){
            sh[i] = gs[i].offsetHeight;
            //var minsh=Math.min.apply(null,sh);
            // 此句放在if里只能把超出c的第一个son元素放在需要位置,对后面的元素就失效了,此句必须放在else中
        }else {
            var minsh=Math.min.apply(null,sh);
            //console.log(minsh);
            //使用Math.min(),()中为数值,不能直接跟数组,需用apply来调用数组中的数值
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

    function gminshsl(sh,minsh){      //get min sh son location
        for(var i in sh){              //遍历得到最小值
            if (sh[i]==minsh){
                return i;
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



//lightBox效果
var gp=document.getElementById("main-gallery");
gp.addEventListener("click",turnOn);
function turnOn(){
    var ts=event.target.src;
    var ns=ts.slice(-6,-4);         //与substring的区别,注意起始位置是相邻两个,其实只包含一个元素
    //alert(ns);
    var cs="../content/life/0"+ns+".jpg";
    document.getElementById("imgx").src=cs;
    document.getElementById("light").style.display="block";
    document.getElementById("fade").style.display="block";
}


var gf=document.getElementById("fade");
gf.addEventListener("click",turnOff);
function turnOff(){
    document.getElementById("light").style.display="none";
    document.getElementById("fade").style.display="none";
}





