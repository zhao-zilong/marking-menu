
// 40 60 for a icon
  var originPositionX = 0;
  var originPositionY = 0;
  var secondPositionX = 0;
  var secondPositionY = 0;
  var thirdPositionX = 0;
  var thirdPositionY = 0;
  var isMainMenuShowed = false;
  var isAllowedMainMenu = false;
  var isShowedMainMenu = false;
  var isAllowedSubMenu = false;
  var isShowedSubMenu = false; //if allowed program to calculate again the position of submenu, actually we need just once
  var isShowedResult = false;
  var isCalculatedGesture = false;
  var showButton = false;
  var counter = 0;
  var isPressed = false;
  var step = 0;
  var direction = -1;// stock first direction

  var resultat = "";
  var gesture = [];
  var stopCounter = 0;


  var subMenuElement;

  // calculate position of mouse every 10 milliseconds
  var mousePos;
  var lastPos = null;
  var points = [];


  var canvas = document.getElementById('can');
  var context = canvas.getContext("2d");
  context.fillStyle = "black";
  context.font = "bold 16px Arial";
  context.fillText("selection: "+resultat, 100, 100);




  document.addEventListener("mousedown", showMenu);
  document.addEventListener("mouseup", hideMenu);

  function showMenu(event) {
      counter = 0;
      lastPos = null;
      isPressed = true;
      isAllowedMainMenu = true;
      isShowedResult = false;
      originPositionX = event.pageX;
      originPositionY = event.pageY;
    (function(event, etape) {
      setTimeout(function(){
        if(isAllowedMainMenu && isPressed == true && step == etape){

          var   mainMenuElement= document.getElementById( 'mainMenu' );
          var   items = mainMenuElement.querySelectorAll( '.circle a' );
          console.log(event.pageX+" "+event.pageY+" "+window.innerHeight);
          for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (event.pageX  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/l) * i * Math.PI)).toFixed(4) + "px";
            items[i].style.top = (event.pageY - window.innerHeight + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";
            console.log("MAIN left: "+items[i].style.left+" top: "+items[i].style.top);
          }

          mainMenuElement.classList.toggle('open');

          isShowedMainMenu = true;
          isAllowedSubMenu = true;
      }},200);
    })(event,step);

  }
  function hideMenu(event)  {
    isPressed = false;
    isCalculatedGesture = false;
    points = [];
    stopCounter = 0;
    context.fillText("selection: "+resultat, 100, 100);
    if(isShowedMainMenu == true){
      var   mainMenuElement= document.getElementById( 'mainMenu' );
      var   items = mainMenuElement.querySelectorAll( '.circle a' );
      for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = null;
        items[i].style.top = null;
      }
      mainMenuElement.classList.toggle('open');
      isShowedMainMenu = false;

    }
    // if(isShowedSubMenu == true || showButton == true){
    if(isShowedSubMenu == true){
      var   items = subMenuElement.querySelectorAll( '.circle a' );
      for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = null;
        items[i].style.top = null;
      }
      subMenuElement.classList.toggle('open');
      console.log("close submenu");
      isShowedSubMenu = false;
    }

    step++;
  }






// control the way to choose, we can show the menu, or we can use directly gesture
      document.addEventListener("mousemove", handleMouseMove);
      setInterval(getMousePosition, 20); // setInterval repeats every X ms
      function handleMouseMove(event) {
          mousePos = {
              x: event.pageX,
              y: event.pageY
          };
      }
      function getMousePosition() {
            if (isPressed == true && mousePos) {
              if(lastPos == null){
                 lastPos = mousePos;
                 points[counter] = [mousePos.x, mousePos.y];
                 counter++;
                 return;
              }
              else{

                if(counter < 10 && isAllowedMainMenu==true){
//                  console.log((mousePos.x - lastPos.x)*(mousePos.x - lastPos.x)
//                  + (mousePos.y - lastPos.y)*(mousePos.y - lastPos.y));

                      if((mousePos.x - lastPos.x)*(mousePos.x - lastPos.x)
                        + (mousePos.y - lastPos.y)*(mousePos.y - lastPos.y) > 100){
                          isAllowedMainMenu = false;
                      }
                  points[counter] = [mousePos.x, mousePos.y];
                }

                else{//must check that mainmenu had opened
                  points[counter] = [mousePos.x, mousePos.y];
                  if(mousePos.x == lastPos.x && mousePos.y == lastPos.y
                    && (mousePos.x - originPositionX)*(mousePos.x - originPositionX)+(mousePos.y - originPositionY)*(mousePos.y - originPositionY)>2500
                    && isAllowedMainMenu == true
                    && isAllowedSubMenu == true){
                      var   mainMenuElement= document.getElementById( 'mainMenu' );
                      var   items = mainMenuElement.querySelectorAll( '.circle a' );
                      for(var i = 0, l = items.length; i < l; i++) {
                        items[i].style.left = null;
                        items[i].style.top = null;
                      }
                      mainMenuElement.classList.toggle('open');
                      isShowedMainMenu = false;
                      console.log("close menu");


                      secondPositionX = mousePos.x;
                      secondPositionY = mousePos.y;

                      direction = calculateDirection(secondPositionY ,originPositionY , originPositionX , secondPositionX);
                      if(direction == 1)
                      subMenuElement= document.getElementById( 'submenuTools' );
                      if(direction == 2)
                      subMenuElement= document.getElementById( 'submenuVehicle' );
                      if(direction == 3)
                      subMenuElement= document.getElementById( 'submenuFoods' );
                      if(direction == 4)
                      subMenuElement= document.getElementById( 'submenuAnimals' );

                      var   items = subMenuElement.querySelectorAll( '.circle a' );
                      console.log(mousePos.x+" "+mousePos.y+" "+window.innerHeight);
                      //different direction has to minus different on y direction, to be solved
                      for(var i = 0, l = items.length; i < l; i++) {
                        items[i].style.left = (mousePos.x  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/l) * i * Math.PI)).toFixed(4) + "px";

                        if(direction == 1)
                        items[i].style.top = (mousePos.y - window.innerHeight - 250 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";
                        if(direction == 2)
                        items[i].style.top = (mousePos.y - window.innerHeight - 500 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";
                        if(direction == 3)
                        items[i].style.top = (mousePos.y - window.innerHeight - 1000 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";
                        if(direction == 4)
                        items[i].style.top = (mousePos.y - window.innerHeight - 750 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";


                        console.log("SUB left: "+items[i].style.left+" top: "+items[i].style.top);
                      }
                      subMenuElement.classList.toggle('open');
                      console.log("open submenu");
                      isShowedSubMenu = true;
                      isAllowedSubMenu = false; // only place to set false of isAllowedSubMenu
                  }
                  if( mousePos.x == lastPos.x && mousePos.y == lastPos.y
                    && isAllowedSubMenu == false && secondPositionX != 0
                    && isAllowedMainMenu
                    && (mousePos.x - secondPositionX)*(mousePos.x - secondPositionX)+(mousePos.y - secondPositionY)*(mousePos.y - secondPositionY)>2500
                    && isShowedResult == false){
                        var directFst = direction;
                        thirdPositionX = mousePos.x;
                        thirdPositionY = mousePos.y;
                        var directSec = calculateDirection(thirdPositionY ,secondPositionY , secondPositionX , thirdPositionX);
                        resultat = structure(directFst, directSec);

                        isShowedResult = true;
                    }
                  if(!isAllowedMainMenu && mousePos.x == lastPos.x && mousePos.y == lastPos.y
                  &&isCalculatedGesture == false){
                    stopCounter++;
                  if(stopCounter > 3){
                    isCalculatedGesture = true;
                    var directFst = 0;
                    var directSec = 0;
                    var gestureChange = calculateGesture(points);
                    if(gestureChange.directFst == -1&&gestureChange.directSec == -1){
                      resultat = "Can not recognize gesture!";
                    }
                    if(gestureChange.directFst == -1&&gestureChange.directSec != -1){
                      directFst = gestureChange.directSec;
                      directSec = gestureChange.directSec;
                      resultat = structure(gestureChange.directSec,gestureChange.directSec);
                    }
                    if(gestureChange.directFst != -1&&gestureChange.directSec == -1){
                      directFst = gestureChange.directFst;
                      directSec = gestureChange.directFst;
                      resultat = structure(gestureChange.directFst,gestureChange.directFst);
                    }
                    if(gestureChange.directFst != -1&&gestureChange.directSec != -1){
                      directFst = gestureChange.directFst;
                      directSec = gestureChange.directSec;
                      resultat = structure(gestureChange.directFst,gestureChange.directSec);
                    }
                    ctx.strokeRect(mousePos.x, mousePos.y,100,40);
                    context.fillText(resultat, mousePos.x + 20, mousePos.y + 25);
                    //
                    // if(directFst == 1){
                    //   subMenuElement= document.getElementById( 'submenuTools' );
                    // }
                    // if(directFst == 2){
                    //   subMenuElement= document.getElementById( 'submenuVehicle' );
                    // }
                    // if(directFst == 3){
                    //   subMenuElement= document.getElementById( 'submenuFoods' );
                    // }
                    // if(directFst == 4){
                    //   subMenuElement= document.getElementById( 'submenuAnimals' );
                    // }
                    // var   items = subMenuElement.querySelectorAll( '.circle a' );
                    // //console.log(items[directSec-1].style.left);
                    // if(directSec == 1){
                    //     items[1].style.top = (mousePos.y - window.innerHeight - 250 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/4) * 1 * Math.PI)).toFixed(4) + "px";
                    //     items[1].style.left = (mousePos.x - 100  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/4) * 1 * Math.PI)).toFixed(4) + "px";
                    //     console.log(items[1].style.top+" "+items[1].style.left);
                    // }
                    // if(directSec == 2){
                    //     items[0].style.top = (mousePos.y - window.innerHeight - 250 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/4) * 0 * Math.PI)).toFixed(4) + "px";
                    //     items[0].style.left = (mousePos.x  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/4) * 0 * Math.PI)).toFixed(4) + "px";
                    //     console.log(items[0].style.top+" "+items[0].style.left);
                    // }
                    // if(directSec == 3){
                    //     items[3].style.top = (mousePos.y - window.innerHeight - 250 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/4) * 3 * Math.PI)).toFixed(4) + "px";
                    //     items[3].style.left = (mousePos.x  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/4) * 3 * Math.PI)).toFixed(4) + "px";
                    //     console.log(items[3].style.top+" "+items[3].style.left);
                    // }
                    // if(directSec == 4){
                    //     items[2].style.top = (mousePos.y - window.innerHeight - 250 + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/4) * 2 * Math.PI)).toFixed(4) + "px";
                    //     items[2].style.left = (mousePos.x  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/4) * 2 * Math.PI)).toFixed(4) + "px";
                    //     console.log(items[2].style.top+" "+items[2].style.left);
                    // }
                    // showButton = true;
                    // subMenuElement.classList.toggle('open');

                  }
                  }
                }
                counter++;
              }
             lastPos = mousePos;
           }
      }
