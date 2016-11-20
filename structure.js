function calculateDirection(secondPositionY ,originPositionY , originPositionX , secondPositionX){
  var direction = -1;
  var tan = (secondPositionY - originPositionY)/(originPositionX - secondPositionX);
  if(secondPositionX > originPositionX ){
        if(tan <= 1 && tan >= -1){
          direction = 1;
        }
        else if(tan > 1){
          direction = 2;
        }
        else if(tan < 1){
          direction = 4;
        }
  }
  else if(secondPositionX == originPositionX){
        if(secondPositionY < originPositionY){
          direction = 2;
        }
        else{

          direction = 4;
        }
  }
  else{
    if(tan <= 1 && tan >= -1){
      direction = 3;
    }
    else if(tan > 1){
      direction = 4;
    }
    else{
      direction = 2;
    }

  }
  return direction;
}

function structure(directFst, directSec){
  if(directFst == 1)
  {
    if(directSec == 1)
      return "Saw";
    if(directSec == 2)
      return "Wrench";
    if(directSec == 3)
      return "Pliers";
    if(directSec == 4)
      return "Hammer";
  }

  if(directFst == 2)
  {
    if(directSec == 1)
      return "Trunk";
    if(directSec == 2)
      return "Car";
    if(directSec == 3)
      return "Sport";
    if(directSec == 4)
      return "Bus";
  }

  if(directFst == 3)
  {
    if(directSec == 1)
    return "Cheese";
  if(directSec == 2)
    return "Vegetable";
  if(directSec == 3)
    return "Meat";
  if(directSec == 4)
    return "Bread";}

  if(directFst == 4)
  {
    if(directSec == 1)
    return "Cat";
  if(directSec == 2)
    return "Dog";
  if(directSec == 3)
    return "Penguin";
  if(directSec == 4)
    return "Chicken";}
}
function  calculateGesture(points){
  var counter = 0;
  var directFst = -1;
  var directSec = -1;
  var stockDirect = [];
  for(var i = 1; i <= 4; i++ ){
    stockDirect[i] = [-1 , -1]
    //0:order 1:frequence
  }
  // console.log(points);
  for(var i = 0; i < points.length - 1; i++){
    if(points[i][1]!=points[i+1][1] && points[i][0]!=points[i+1][0]){
      var directCurrent = calculateDirection(points[i+1][1], points[i][1],points[i][0],points[i+1][0]);

      if(stockDirect[directCurrent][0] == -1){
          stockDirect[directCurrent][0] = counter;
          counter = counter + 1;
        }

      if(stockDirect[directCurrent][1] == -1)
          stockDirect[directCurrent][1] = 1;
      else
          stockDirect[directCurrent][1] ++;

    }

  }

  var index1 = -1;
  var max1 = -1;
  var order1 = -1;
  for(var i = 1; i <= 4; i++){
      if(stockDirect[i][1] > max1){
        max1 = stockDirect[i][1];
        order1 = stockDirect[i][0];
        index1 = i;
      }
  }
  var index2 = -1;
  var max2 = -1;
  var order2 = -1;
  for(var i = 1; i <= 4; i++){
    if(i != index1){
      if(stockDirect[i][1] > max2){
        max2 = stockDirect[i][1];
        order2 = stockDirect[i][0];
        index2 = i;
      }
    }
  }
  console.log(order1+" "+order2);

  if(order1 > order2)
    return {directFst: index2, directSec: index1};
  else
    return {directFst: index1, directSec: index2};


}
