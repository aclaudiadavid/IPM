var keys_open = 0;
var on_page = 1;
var action = [];
const places = ["Museum Dino", "Museum Science", "Museum Weather", "Park Adult", "Park Air", "Park Kid", "Park Tree", "Restaurant China", "Restaurant France", "Restaurant Italia", "Restaurant Japan"];
var places_to_screen = ["Museum Dino", "Museum Science", "Museum Weather", "Park Adult", "Park Air", "Park Kid", "Park Tree", "Restaurant China", "Restaurant France", "Restaurant Italia", "Restaurant Japan"];
const places_files = ["MA123", "MB12", "MC1", "PA12", "PB12", "PC12", "PD1", "RA123",
"RB123", "RC12", "RD1"];
const descriptions = ["<b>Museum Dino</b><br><br>Do you like Dinosaurs? Rawwwwwr!! Us too! <br> Come visit us, Mondays to Fridays, 10h-17h.", "<b>Museum Science</b><br><br>Space, rocks and cute animals. It's all here! <br> Mondays to Saturdays, 9h-20h.",
"<b>Museum Weather</b><br><br>Why are the clouds shaped like that, you ask? <br> If you visit us you will know why!<br> Saturdays, 8h-16h.", "<b>Park Adult</b><br><br>Perfect place for rock climbing and poker games. <br> Open everyday, 12h-22h.",
"<b>Park Air</b><br><br>Amazing view of the city. Breathe the fresh air. <br> Always open","<b>Park Kid</b><br><br>Lots of slides and swings. A fun place. <br> Open everyday, 7h-20h.", "<b>Park Tree</b><br><br>Read a book, meditate, sing, everyone is welcome. <br> Always open",
"<b>Restaurant China</b><br><br>Flavours brought straight from Beijing,<br> but our dumplings are from heaven! <br> Visit us! We're open everyday for lunch time, 11h-15h", "<b>Restaurant France</b><br><br>Come to our restaurant if you'd like an exclusive <br>gastronomic experience. <br> Open Saturdays, 20h-23h",
"<b>Restaurant Italia</b><br><br>Would you like to discover the real Italian cuisine? <br> You found the right place! <br> Open everyday, 10h-23h", "<b>Restaurant Japan</b><br><br>Ramen, Sushi, Curry Rice,... we cook everything<br>that is Japanese! <br> Please, visit us! <br> Open everyday, 12h-22h"];
var places_ratings = [4.2, 3.0, 2.7, 3.5, 5.0, 4.8, 5.0, 4.6, 4.0, 3.4, 3.5];
var voted = [0,0,0,0,0,0,0,0,0,0,0,0];
var searched = "";
var filter = "";
var last_clicked = "";
var undo = false;
var rating = 0;

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
  updateList();
}

function displayDate() {
  document.getElementById("date").innerHTML = get_date();
  document.getElementById("time").innerHTML = get_time();
  var t = setTimeout(displayDate, 1000);
}

function submitVote() {
  var popUp = document.getElementById('rate');

  if(voted[places.indexOf(last_clicked)] == 0) {
    var b1 = document.getElementById('subbutton');
    var b2 = document.getElementById('leavebutton');
    var b3 = document.getElementById('exit-button');

    b1.style.visibility = "inherit";
    b3.style.visibility = "inherit";
    b2.style.visibility = "hidden";
  }

  if(popUp.style.visibility == "visible") {
    popUp.style.visibility = "hidden"
    change_stars(-1);
  } else {
    popUp.style.visibility = "visible"
  }
}

function vote() {
  var b1 = document.getElementById('subbutton');
  var b2 = document.getElementById('leavebutton');
  var b3 = document.getElementById('exit-button');

  b1.style.visibility = "hidden";
  b3.style.visibility = "hidden";
  b2.style.visibility = "inherit";

  voted[places.indexOf(last_clicked)] = 1;
}

function change_stars(id) {
  if(id != -1) {
    var n = parseInt(id[1], 10);
  }

  for(var i=1;i<=5;i++) {
    if(i<=n) {
      var name = "s" + i;
      var star = document.getElementById(name);
      star.src = "../images/star_rating_selected.png";
    } else {
      var star = document.getElementById('s' + i);
      star.src = "../images/star_rating_unselected.png";
    }
  }
}

function display(clicked) {
  var div = document.getElementById('place-info');
  var image = document.getElementById('place-img');
  var text = document.getElementById('description');
  var keyboard = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');

  var array = clicked.textContent.split(" ");
  var tmp = "";
  for (var i in array) {
    if (array[i].includes("1") || array[i].includes("2") || array[i].includes("3") || array[i].includes("4") || array[i].includes("5")){
        break;
    }
    tmp = tmp + (array[i] + " ");
  }
  var idx = places.indexOf(tmp.trim());

  image.style.backgroundImage = "url(../images/" + places_files[idx] + ".jpg)";

  var compare = description.innerHTML;
  description.innerHTML = descriptions[idx];

  last_clicked = places[idx];

  if(clicked.textContent !== ""){
    if(div.style.visibility != "visible") {
      keyboard.style.visibility = "hidden";
      close.style.visibility = "hidden";
      div.style.visibility = "visible";
    } else {
      if (compare === descriptions[idx]) {
        div.style.visibility = "hidden";
      }
    }
  }
}

function helpClick() {
  var bracelet_txt = document.getElementById('bracelet_txt');
  var place_info = document.getElementById('place-info');
  var button = document.getElementById('help');
  var keys = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');

  if(bracelet_txt.style.visibility === "visible"){
    bracelet_txt.style.visibility = "hidden";
    document.getElementById("Sinfo").innerHTML = "";
    document.getElementById("place-img").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    place_info.style.visibility = "hidden";
    button.style.backgroundImage = 'url(../images/help_icon.png)';
    keyboard_help();
  }
  else{
    keys.style.visibility = "hidden";
    close.style.visibility = "hidden";
    bracelet_txt.style.visibility = "visible";
    document.getElementById("place-img").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    place_info.style.visibility = "hidden";
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
  var place_info = document.getElementById('place-info');

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
    document.getElementById("place-img").innerHTML = "";
    document.getElementById("description").innerHTML = "";
    place_info.style.visibility = "hidden";
  }
}

window.onclick = function(event) {
  if (!event.target.matches('#filter')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function dropview() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function goToPlace() {
  window.location.href = "maps.html?name=" + last_clicked.replace(" ", 1);
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
    document.getElementById("Sinfo").innerHTML = "It wasn't possible to find any place with the name " + text.fontcolor("red") +
    " <br> Please check if you have spelled it correctly with <br> one space between words and no extra spaces anywhere" +
    "<br> <br> Try searching something like: <br>-museum nameOfMuseum"
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
      text.innerHTML = '<h6 id="T1" onclick="display(this)" >'+ places_to_screen[j] + " <br>" + places_ratings[i-1] + ' <img id="star" src="../images/star_rating_selected.png" /></h6>';
      document.getElementById("T1").style.marginTop = "0%";
      i++;
      continue;
    }
    text.innerHTML = '<h6 onclick="display(this)" >'+ places_to_screen[j] + " <br>" + places_ratings[i-1] + ' <img id="star" src="../images/star_rating_selected.png" /></h6>';
    i++;
  }
}

//filtrar Museums
function update_list1() {
  if(searched !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want clear searched suggestion?";
    filter = "M";
    return;
  }
  places_to_screen = [];

  for (var i in places) {
    if (places[i].includes("Museum")) {
      places_to_screen.push(places[i]);
    }
  }
  document.getElementById("filter").src = "../images/filter_act.png";
  updateList();
}
//filtrar parques
function update_list2(){
  if(searched !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want clear searched suggestion?";
    filter = "P";
    return;
  }
  places_to_screen = [];

  for (var i in places) {
    if (places[i].includes("Park")) {
      places_to_screen.push(places[i]);
    }
  }

  document.getElementById("filter").src = "../images/filter_act.png";
  updateList();
}
//filtrar restaurantes
function update_list3(){
  if(searched !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want clear searched suggestion?";
    filter = "R";
    return;
  }
  places_to_screen = [];

  for (var i in places) {
    if (places[i].includes("Restaurant")) {
      places_to_screen.push(places[i]);
    }
  }

  document.getElementById("filter").src = "../images/filter_act.png";
  updateList();
}

function clearFilter() {
  places_to_screen = places;

  document.getElementById("filter").src = "../images/filter.png";
  updateList();
  filter = "";
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

function undoClick(){
  var last = action.pop();

  switch (last) {
    case "help":
      undo = true;
      helpClick();
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
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want leave Suggestions? Progress will not be saved";
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

  if(text === "Are you sure you want leave Suggestions? Progress will not be saved"){
    document.location.href = "home.html";
  }

  if(text === "Are you sure you want clear searched suggestion?"){
    document.getElementById("search_box").value = "";
    searched = "";
    if(filter === "M"){
      update_list1();
    }
    else if(filter === "P"){
      update_list2();
    }
    else{
      update_list3();
    }
  }

  document.getElementById("confirm").style.visibility = "hidden";
  document.getElementById("confirm_txt").innerHTML = "";
}
