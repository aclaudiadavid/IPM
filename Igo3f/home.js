var action = 0;

function get_date() {
  date = new Date;
  m = date.getMonth();
  d = date.getDate();

  m = m + 1;

  if (m < 10) {
    m = "0" + m;
  }

  if (d < 10) {
    d = "0" + d;
  }

  to_print = d + ' / ' + m

  return to_print;
}

function get_time() {
  date = new Date;
  h = date.getHours();
  m = date.getMinutes();

  if (h < 10) {
    h = "0" + h;
  }

  if (m < 10) {
    m = "0" + m;
  }

  to_print = h + ' : ' + m;

  return to_print;
}

function displayDate() {
  document.getElementById("date").innerHTML = get_date();
  document.getElementById("time").innerHTML = get_time();
  var t = setTimeout(displayDate, 1000);
}

function helpClick(){
  var bracelet_txt = document.getElementById('bracelet_txt');
  var button = document.getElementById('help');

  if(!action){
    action = 1;
  }

  if(bracelet_txt.style.visibility === "visible"){
    bracelet_txt.style.visibility = "hidden";
    button.style.backgroundImage = 'url(../images/help_icon.png)';
  }
  else{
    bracelet_txt.style.visibility = "visible";
    button.style.backgroundImage = 'url(../images/quit_icon.png)';
  }
}

function mapClick(){
  //perhaps fazer uma click para todas as imagens do screen
  document.location.href = "maps.html";
}

function folderClick(){
  document.location.href = "tickets.html";
}

function suggestionsClick() {
  document.location.href = "suggestions.html";
}

function undoClick(){
  if(action){
    helpClick();
    action = 0;
  }
}
