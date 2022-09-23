const date1 = ["Coming Soon..."];
const date2 = ["Stay Tuned..."];
const team1 = [];
const team2 = [];
var len = date1.length;

var i = 0;
function next() {
  if (i < len - 1) {
    i = i + 1;
    document.getElementById("date1").innerHTML = date1[i];
    document.getElementById("date2").innerHTML = date2[i];
  }
}
function prev() {
  if (i > 0) {
    i--;
    document.getElementById("date1").innerHTML = date1[i];
    document.getElementById("date2").innerHTML = date2[i];
  }
}

document.getElementById("robowbutton").onclick=function()
{   
    document.getElementById("vido").style.display="block";
    document.getElementById("Robowarstext").style.display="block";
    document.getElementById("Roboviticstext").style.display="none";
    document.getElementById("robowbutton").style.background="rgba(158, 135, 251, 0.9)";
    document.getElementById("robovbutton").style.background="rgba(120, 74, 250, 0.4)";
    console.log(1);
}
document.getElementById("robovbutton").onclick=function()
{
    document.getElementById("vido").style.display="block";
    document.getElementById("Robowarstext").style.display="none";
    document.getElementById("Roboviticstext").style.display="block";
    document.getElementById("robowbutton").style.background="rgba(120, 74, 250, 0.4)";
    document.getElementById("robovbutton").style.background="rgba(158, 135, 251, 0.9)";
    console.log(2);
}


var slideIndex = 0;
showSlides();
showSlides2();
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}
function plusSlides2(n) {
  showSlides2(slideIndex += n);
}

// Thumbnail image controls
function currentSlide2(n) {
  showSlides2(slideIndex = n);
}
function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for(i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if(slideIndex > slides.length) {
          slideIndex = 1
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
}
function showSlides2() {
  var i;
  var slides = document.getElementsByClassName("mySlides2");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides2, 2000); // Change image every 2 seconds
}

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}