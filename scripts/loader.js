window.onload = function() {
    var white = document.getElementById("loaderImg");
    white.addEventListener("animationend", function() {
      this.remove();
    });
    white.classList.add("fade-out-animation");
    // var spin = document.getElementById("spinWheel");
    // spin.addEventListener("animationend", function() {
    //   this.remove();
    // })
    // spin.style.animation = "spin 2s linear infinite, fadeOut 1.5s forwards"; 
}