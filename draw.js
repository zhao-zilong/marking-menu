window.onload = function () {
  var isMainShowed = false;
  document.addEventListener("click", showMenu);
  function showMenu(event) {
      var   mainMenuElement= document.getElementById( 'mainMenu' );
      var   items = mainMenuElement.querySelectorAll( '.circle a' );

      for(var i = 0, l = items.length; i < l; i++) {
        items[i].style.left = (event.clientX  - 100 * Math.cos(-0.5 * Math.PI - 2*(1/l) * i * Math.PI)).toFixed(4) + "px";

        items[i].style.top = (event.clientY + 100 * Math.sin(-0.5 * Math.PI - 2 * (1/l) * i * Math.PI)).toFixed(4) + "px";
      }
      mainMenuElement.classList.toggle('open');
  }
};
