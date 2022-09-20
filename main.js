const date1=["1st April 2022","2nd April 2022","3rd April 2022","4th April 2022"];
const date2=["2nd April 2022","3rd April 2022","4th April 2022","5th April 2022"];
const team1=[];
const team2=[];
var len=date1.length;
console.log(len);

var i=0;
function next(){
    if(i<len-1){
        i=i+1;
        document.getElementById("date1").innerHTML=date1[i];
        document.getElementById("date2").innerHTML=date2[i];
    }
}
function prev(){
    if(i>0){
        i--;
        document.getElementById("date1").innerHTML=date1[i];
        document.getElementById("date2").innerHTML=date2[i];
    }
}
