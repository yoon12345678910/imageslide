    var x = 400;
    var curSlideNo = 0;
    var next = 1;
    var slider = document.getElementById("slide");
    var slideArray = slider.getElementsByTagName("li");
    var index = document.getElementById("index");
    var indexArray = index.getElementsByTagName("a");
    var aniStart = false;
    var autoSlideMode = false;
    var autoPlay_IntervalId;
    
    window.onload=function(){
      for (i = 0; i <= slideArray.length - 1; i++) {
        if (i == curSlideNo) slideArray[curSlideNo].style.left = 0;
        else slideArray[i].style.left = -x + "px";
      }

      for(var i = 0; i < indexArray.length; i++){
        indexArray[i].id = i;
        indexArray[i].onclick = function(){
          changeShowIndex(this.id);
        };
      };
    };

      function left_move() {
        aniStart = true;
        var curX = parseInt(slideArray[curSlideNo].style.left, 10);
        var nextX = parseInt(slideArray[next].style.left, 10);
        var newCurX = curX + 10;
        var newNextX = nextX + 10;

          if (newCurX >= x) {
          slideArray[curSlideNo].style.left = -x + "px";
          slideArray[next].style.left = 0;
          curSlideNo = curSlideNo -1;

          if(curSlideNo === -1) curSlideNo = 3;
            aniStart = false; 
            return;
        }

        slideArray[curSlideNo].style.left = newCurX + "px";
        slideArray[next].style.left = newNextX + "px";

        setTimeout(function () {
          left_move();
        }, 20);
      }

      function right_move(){ 
        aniStart = true;       
        var curX = parseInt(slideArray[curSlideNo].style.left, 10);       
        var nextX = parseInt(slideArray[next].style.left, 10);
        var newCurX = curX - 10;
        var newNextX = nextX - 10;

         if (newCurX <= -x) {
          slideArray[curSlideNo].style.left = -x + "px";
          slideArray[next].style.left = 0;
          curSlideNo = curSlideNo + 1;

          if (curSlideNo > slideArray.length - 1) curSlideNo = 0;
            aniStart = false;  
            return;
        }
       
        slideArray[curSlideNo].style.left = newCurX + "px";
        slideArray[next].style.left = newNextX + "px";

        setTimeout(function () {
          right_move();
        }, 20);
      }
      
      function autoPlay(){
        if(autoSlideMode == false){
            autoSlideMode = true;
            autoPlay_IntervalId = setInterval(function(){ 
              next = curSlideNo + 1 === 4 ? 0 : curSlideNo + 1;
              slideArray[next].style.left = x + "px";
              changeShowIndex(next);
              right_move(); 
            }, 2500);
        }
      }

      function autoPause(){
        clearInterval(autoPlay_IntervalId);
        autoSlideMode = false;
        autoPlay_IntervalId = null;
      }

      function btnLeft(){
        if(autoPlay_IntervalId) autoPause();
        if (aniStart == true) return;
        next = curSlideNo - 1 === -1 ? 3 : curSlideNo - 1;
        changeShowIndex(next);
        left_move();
      }

      function btnRight(){
        if(autoPlay_IntervalId) autoPause();
        if (aniStart == true) return;
        next = curSlideNo + 1 === 4 ? 0 : curSlideNo + 1;
        slideArray[next].style.left = x + "px";
        changeShowIndex(next);
        right_move();
      }

       function changeShowIndex(index){    
          for(i = 0; i <= indexArray.length - 1; i++){
             document.getElementsByClassName("index-item")[i].classList.remove('index-item-on');
           }
             document.getElementsByClassName("index-item")[index].classList.add( 'index-item-on' );
          
       };  