import { Head } from "./modules/SnakeBody.js";

// Funciones (requiere simplificación)
function testing(location, block){
   if (ctx.getImageData(location.x * 10, location.y * 10, 1, 1).data.at(0) === block[0]){
      console.log("Fruto detectado.");
      return true;
   }
}

function setting(location, block){ 
   if(block == "void"){
      ctx.clearRect(location.x * 10, location.y * 10, 10, 10);
      console.log(`cola se ha movido hacia ${location.x + 1}`)
   }
   else{
      ctx.fillRect(location.x * 10, location.y * 10, 10, 10);
      console.log(`cabeza se ha movido hacia ${location.x}`)
   }
}


// Declaraciones y DOM
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const head = new Head([255, 0], {x: 1, y: 1, z: 0}, "East", setting, testing);


// Canvas
ctx.fillStyle = "rgb(0 0 0)";
ctx.fillRect(10, 10, 10, 10);
ctx.strokeRect(0, 0, 300, 150);


// Main
(function main(time){
   window.requestAnimationFrame(main);
   
   if(head.location.x < 20) {
      head.forward();
      
   } else return;
})();

/*
puedes imaginar que se siente estar sólo? o cómo es amar. 
puedo senti muchas cosas, malas y buenas. 
*/
