var keys_open = 0;
var action = [];
const places_txt = ["Flight Frankfurt to Berlin <br> Leaves in the 23th of May at 15:30","Reservation for the Berlin Museum <br> 24th of May at 10:30",
"Reservation for the Rutz Restaurant <br> 24th of May at 12:30", "Flight Berlin to Frankfurt <br> Leaves in the 25th of May at 16:30"];
const places = ["Frankfurt to Berlin <br> 23/05 15:30","Berlin Museum <br> 24/05 10:30"
,"Rutz Restaurant <br> 24/05 12:30", "Berlin to Frankfurt <br> 25/05 16:30"];
var places_to_screen = ["Frankfurt to Berlin <br> 23/05 15:30","Berlin Museum <br> 24/05 10:30"
,"Rutz Restaurant <br> 24/05 12:30", "Berlin to Frankfurt <br> 25/05 16:30"];
var searched = "";
var undo = false;
var on_page = 1;
var npages = Math.ceil(places.length / 3.0); //tornar dinamico com length places

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

function start() {
  displayDate();
  displayPages();
}

function displayDate() {
  document.getElementById("date").innerHTML = get_date();
  document.getElementById("time").innerHTML = get_time();
  var t = setTimeout(displayDate, 1000);
}

function displayPages() {
  //calls a function that loads the page
  updateList(false);
}

function nextp() {

  if(!undo){
    action.push("np");
  }
  else{
    undo = false;
  }

  on_page++;

  displayPages();
  updateList(true);
}

function prevp(){

  if(!undo){
    action.push("lp");
  }
  else{
    undo = false;
  }

  on_page--;

  displayPages();
  updateList(false);
}

function helpClick() {
  var bracelet_txt = document.getElementById('bracelet_txt');
  var button = document.getElementById('help');
  var keys = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');

  if(bracelet_txt.style.visibility === "visible"){
    bracelet_txt.style.visibility = "hidden";
    document.getElementById("Tinfo").innerHTML = "";
    button.style.backgroundImage = 'url(../images/help_icon.png)';
    keyboard_help();
  }
  else{
    keys.style.visibility = "hidden";
    close.style.visibility = "hidden";
    bracelet_txt.style.visibility = "visible";
    button.style.backgroundImage = 'url(../images/quit_icon.png)';
    if(!undo){
      action.push("help");
    }
    else{
      undo = false;
    }
  }
}

function keyboard_help() {
  var keys = document.getElementById('keys');
  var close = document.getElementById('close_keys');

  if(!undo){
    action.push("keyhelp");
  }
  else{
    undo = false;
  }

  if (keys_open == 1) {
    keys.style.visibility = "visible";
    close.style.visibility = "visible";
  }
}

function textClick() {
  var keyboard = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');
  var bracelet_txt = document.getElementById('bracelet_txt');
  var button = document.getElementById('help');

  if(!undo){
    action.push("txt");
  }
  else{
    undo = false;
  }

  if (keyboard.style.visibility === "visible") {
      keys_open = 0;
      keyboard.style.visibility = "hidden";
      close.style.visibility = "hidden";
  } else {
    keyboard_open = 1;
    bracelet_txt.style.visibility = "hidden";
    button.style.backgroundImage = 'url(../images/help_icon.png)';
    keyboard.style.visibility = "visible";
    close.style.visibility = "visible";
  }
}

function addTicket(name) {

  //adicionar a places
  //organizar places cronologicamente
}

function searchPlace(text){
  //refazer o search plaece todo!!!!
  //tmp_places = places.filter(word => word.toLowerCase().includes(text) === true);
  places_to_screen = places.filter(word => word.toLowerCase().includes(text) === true);

  if (places_to_screen.length > 0){
    for(i=1;i<=places_to_screen.length;i++){
      searched = text;
      var ntmp = places_to_screen[i-1].toLowerCase().indexOf(text);
      var tmp = places_to_screen[i-1].slice(ntmp, ntmp + text.length);
      if ((text === "b" || text === "br") && (places_to_screen[i-1][ntmp+2] === ">" || places_to_screen[i-1][ntmp+1] === ">")) {
        continue;
      }
      else {
        places_to_screen[i-1] = places_to_screen[i-1].slice(0, ntmp) + tmp.fontcolor("red") + places_to_screen[i-1].slice(ntmp + text.length);
      }
    }
    updateList(true);
  }
  else{
    document.getElementById("Tinfo").innerHTML = "It wasn't possible to find any place with the name " + text.fontcolor("red") +
    " <br> Please check if you have spelled it correctly with <br> one space between words and no extra spaces anywhere" +
    "<br> <br> Try searching something like: <br>-ticket nameOfOrigin to nameOfDestination"
    helpClick();
  }
}

function updateList(bool){
  document.getElementById("table").innerHTML = "";
  var table = document.getElementById('table');
  var i=1;
  for(var j in places_to_screen) {
    if(places_to_screen[j] === places[i-1] && bool){
      i++;
      continue;
    }
    var row = table.insertRow(-1);
    var text = row.insertCell(0);
    if(i===1){
      text.innerHTML = '<h6 id="T1" onclick="display(this)" >'+ places_to_screen[j] + '</h6>';
      document.getElementById("T1").style.marginTop = "0%";
      i++;
      continue;
    }
    text.innerHTML = '<h6 onclick="display(this)" >'+ places_to_screen[j] + '</h6>';
    i++;
  }
}

function printLeter(letter) {
  var textbox = document.getElementById("search_box");

  switch (letter.id) {
    case "bs":
      textbox.value = textbox.value.substring(0,textbox.value.length-1);
      break;
    case "et":
      searchPlace(textbox.value);
      break;
    case "sb":
      textbox.value += " ";
      break;
    default:
      textbox.value += letter.id;
      break;
    }
  searched = textbox.value;
}

function display(clicked){
  var bracelet_txt = document.getElementById('bracelet_txt');
  var array = clicked.textContent.split(" ");
  var tmp = "";
  var bool = true;
  for (var i in array) {
    if (!array[i].includes("/") && array[i] != ""){
        tmp = tmp + (array[i] + " ");
    }
    else if (bool && array[i].includes("/")) {
      tmp = tmp + "<br> ";
      tmp = tmp + (array[i] + " ");
      bool = false;
    }
  }
  var idx = places.indexOf(tmp.trim());

  if(clicked.textContent !== ""){
    if(bracelet_txt.style.visibility === "visible" && document.getElementById("Tinfo").innerHTML !== places_txt[idx].fontcolor("MediumBlue")) {
      document.getElementById("Tinfo").innerHTML = places_txt[idx].fontcolor("MediumBlue");
    } else if (bracelet_txt.style.visibility === "visible") {
      helpClick();
    } else {
      document.getElementById("Tinfo").innerHTML = places_txt[idx].fontcolor("MediumBlue");
      helpClick();
    }
  }
}

function delete_search() {
  var textbox = document.getElementById("search_box");
  var bracelet_txt = document.getElementById('bracelet_txt');

  if(textbox.value !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want clear searched ticket?";
    return undefined;
  }

  searched = "";
  searchPlace("");

  if (bracelet_txt.style.visibility === "visible") {
      helpClick();
  }
}

function undoClick(){
  var last = action.pop();

  switch (last) {
    case "help":
      undo = true;
      helpClick();
      break;
    case "np":
      undo = true;
      nextp();
      break;
    case "lp":
      undo = true;
      prevp();
      break;
    case "txt":
      undo = true;
      textClick();
      break;
    case "keyhelp":
      undo = true;
      keyboard_help();
      break;
    default:
      homeClick();
      break;
  }
}

function homeClick(){
  var text = document.getElementById("search_box").value;

  if(text !== "" || !(action.length <1)){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want leave Tickets and Reservations? Progress will not be saved";
  }
  else{
    document.location.href = "home.html";
  }

}

function noClick() {
  document.getElementById("confirm").style.visibility = "hidden";
  document.getElementById("confirm_txt").innerHTML = "";
}

function yesClick(){
  var text = document.getElementById("confirm_txt").innerHTML;

  console.log(text);
  if(text === "Are you sure you want leave Tickets and Reservations? Progress will not be saved"){
    document.location.href = "home.html";
  }

  if(text === "Are you sure you want clear searched ticket?"){
    document.getElementById("search_box").value = "";
    delete_search();
  }

  document.getElementById("confirm").style.visibility = "hidden";
  document.getElementById("confirm_txt").innerHTML = "";
}
