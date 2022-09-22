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