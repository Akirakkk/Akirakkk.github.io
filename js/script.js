window.onload=function (){
  var nav_btn = document.getElementById('nav_btn');
  var sections= document.getElementsByTagName('section');
  var lists = nav_btn.children;
  var img=document.getElementById('profile_img');
  var imgs =img.children;
  //section切换
  for (var i = 0; i < lists.length; i++) {
  	lists[i].index=i;
  	addevent(lists[i],"click",function (){
  		for (var j = 0; j< sections.length; j++) {
  			startmove(sections[j],{"opacity":0});
  			sections[j].style.display="none";
  		}
  		for (var k = 0; k < lists.length; k++) {
  			lists[k].className="";
  		}
        this.className="active";
  		startmove(sections[this.index],{"opacity":100});
  		sections[this.index].style.display="block";
  	});
  }
  //轮播图
  var num=0;
  var val=100;
  var d=-1;
  var timer_s=null;
  timer_s=setInterval(function(){
  	  	imgs[num].style.filter='alpha(opacity:'+val+')';
        imgs[num].style.opacity=val/100;
        val+=d;     
        if (val>=130) {
        	d=-d;
        }

        if (val<=0) {
  	      imgs[num].className="";
  	       num++;
           d=-d;
  	       if (num>2) {
  	           num=0;
            }
  	       imgs[num].className="active";
        }
  	  },50);

  
  
  


}


//获取样式
function getstyle(obj,attr){
      if (obj.currentStyle) {
        return obj.currentStyle[attr];
      }else{
        return getComputedStyle(obj,false)[attr];
      }
}
//运动框架
function startmove(obj,json,fn){
	 var flag=true;
        clearInterval(obj.timer);
        obj.timer=setInterval(function(){
            //取当前值
            for(var attr in json)
            {
        	var icurr=0;
        	if (attr=='opacity') {
        		icurr=Math.round(parseFloat(getstyle(obj,attr))*100);
        	}else{
        		icurr=parseInt(getstyle(obj,attr));
        	}
            //算速度
        	var speed=(json[attr]-icurr)/8;
        	speed=speed>0?Math.ceil(speed):Math.floor(speed);
            //检测停止
        	if (icurr!=json[attr]) {
        		flag=false;
        	}
        	if (attr=='opacity') {
                    obj.style.filter='alpha(opacity:'+(icurr+speed)+')';
                    obj.style.opacity=(icurr+speed)/100;
        		}else{
        			obj.style[attr]=icurr+speed+'px';
        		}       		
        	}
        	if (flag) {
        		clearInterval(obj.timer);
        	if (fn) {
        			fn();
        	}
          }  
        },50);
}
//className获取元素集
function getClassName(parent,className){
	var parent = document.getElementById(parent);
	var lis =parent.children;
	var lists=[];
	for (var i = 0; i < lis.length; i++) {
		if (lis[i].className==className) {
           lists.push(lis[i]);
           return lists;
		}
	}
}
//添加事件
function  addevent(element,type,shijain){
          if (element.addEventListener) {
               element.addEventListener(type,shijain,false);
          }else if (element.attachEvent) {
               element.attachEvent('on'+type,shijain);
          }else{
               element['on'+type]=shijain;
          }
}