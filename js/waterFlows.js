//瀑布流主图库

window.onload=function(){
    sl("main-gallery-container","box");

    //json字符串模拟网络数据
    var imgData={"data":[
        //{"src":"016.jpg"},{"src":"017.jpg"},{"src":"018.jpg"},{"src":"019.jpg"},{"src":"020.jpg"},
        //{"src":"021.jpg"},{"src":"022.jpg"},{"src":"023.jpg"},{"src":"024.jpg"},{"src":"025.jpg"},
        {"src":"026.jpg"},{"src":"027.jpg"},{"src":"028.jpg"},{"src":"029.jpg"},{"src":"030.jpg"}

    ]};
    //必须通过onscroll监听滚动条,无监听直接定义,输出始终为0
    window.onscroll=function(){
        if (judge()){
            //alert("hello");
            var gp=document.getElementById("main-gallery-container");
            for (var i=0;i<imgData.data.length;i++){
                var cd=document.createElement("div");
                cd.className="box";
                gp.appendChild(cd);
                //alert(cd.className);
                var cd1=document.createElement("div");
                cd1.className="img";
                cd.appendChild(cd1);
                var ca=document.createElement("a");
                ca.href="articles/article.html";
                cd1.appendChild(ca);
                var ci=document.createComment("img");
                ci.src="../content/life/"+imgData.data[i].src; //此处路径写法注意
                ca.appendChild(ci);
            }
            sl();
        }
    };
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
    if (lst<st+ch){
        return true;
    }
}


function sl(parent,son){                 //son location函数
    var gp=document.getElementById(parent);
    var gs=gnc(gp,son);
    var sw=gs[0].offsetWidth;
    //console.log(sw);
    var c=Math.floor(document.body.clientWidth/sw);  //
    //gp.style.cssText="width:"+sw*c+"px;margin:0 auto;";//固定化后跟bootstrap的自适应冲突
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
            sonarr.push(allson[i]); //数组向其末尾进行追加
        }
    }
    return sonarr;
}









