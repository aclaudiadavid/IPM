var keys_open = 0;
var undo = false;
var has_location = 0;
var is_on_map = [0,0,0,0];
var map_type = "";
var loc_type = "";
var last_position;
var action = [];
const place_img_files = [];
const places_files = ["MA","MB","MC","PA","PB","PC","PD","RA","RB","RC","RD","TA","TB"];
const places = ["museum dino","museum science", "museum weather" ,"park adult", "park air","park kid",
 "park tree", "restaurant china", "restaurant france", "restaurant italia", "restaurant japan",
"station metro", "station bus"];
const map1_pos = ["MA123", "MB12", "MC1", "PA12", "PB12", "PC12", "PD1", "RA123",
"RB123", "RC12", "RD1", "TA12", "TB1"];
const map2_pos = ["MA123", "MB12", "PA12", "PB12", "PC12", "RA123", "RB123", "RC12",
"TA12"];
const map3_pos = ["MA123", "RA123", "RB123"];
var searched = "";
var filtered = "";

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

function update_map() {
  if(window.location.search != "") {
    var pos = window.location.search.indexOf("=");
    var name = window.location.search.slice(pos+1);
    document.getElementById('city').src = "../images/city_map2" + places_files[places.indexOf(name.replace(1, " ").toLowerCase())] + ".jpg";
    map_type = places_files[places.indexOf(name.replace(1, " ").toLowerCase())];
  }
}

function start(){
  displayDate();
  update_map();
  document.getElementById("places-info").style.visibility = "hidden";
}

function helpClick() {
  var bracelet_txt = document.getElementById('bracelet_txt');
  var button = document.getElementById('help');
  var keys = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');
  var table = document.getElementById("places-info");

  if(table.style.visibility === "visible"){
    table.style.visibility = "hidden";
  }

  if(bracelet_txt.style.visibility === "visible"){
    bracelet_txt.style.visibility = "hidden";
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

function show_places() {
  var text = document.getElementById("places-info");
  var keyboard = document.getElementById("keyboard");
  var close = document.getElementById("close_keys");

  if(document.getElementById("bracelet_txt").style.visibility == "visible"){
    undo = true;
    helpClick();
  }
  else if(keyboard.style.visibility === "visible"){
    keys_open = 0;
    keyboard.style.visibility = "hidden";
    close.style.visibility = "hidden";
  }
  else if(text.style.visibility === "visible"){
    text.style.visibility = "hidden";
    return;
  }

  text.style.visibility = "visible";

  updateInfo();
}

function updateInfo(){
  var image = document.getElementById("city").src;
  var map = image.slice(-6);
  var type = "";
  var text = document.getElementById("places-info");
  text.innerHTML = '<table id="table"></table>';
  var table = document.getElementById('table');

  if(map.includes("3")) {
    type += "3";
  } else if(map.includes("2")) {
    type += "2";
  } else {
    type += "1";
  }

  if(map.includes("M")) {
    type = "M" + type;
  } else if(map.includes("P")) {
    type = "P" + type;
  } else if(map.includes("R")){
    type = "R" + type;
  } else {
    type = "T" + type;
  }

  if(type.includes("3")) {
    for(var i in map3_pos) {
      if(map3_pos[i].includes(type[0]) && map3_pos[i].includes(type[1])) {
        var row = table.insertRow(-1);
        var img = row.insertCell(0);
        var name = row.insertCell(1);
        img.innerHTML = '<img id="place-img" src="../images/' + map3_pos[i] + '.jpg" />';
        name.innerHTML = places[map1_pos.indexOf(map3_pos[i])];
      }
    }
  } else if(type.includes("2")) {
    for(var i in map2_pos) {
      if(map2_pos[i].includes(type[0]) && map2_pos[i].includes(type[1])) {
        var row = table.insertRow(-1);
        var img = row.insertCell(0);
        var name = row.insertCell(1);
        img.innerHTML = '<img id="place-img" src="../images/' + map2_pos[i] + '.jpg" />';
        name.innerHTML = places[map1_pos.indexOf(map2_pos[i])];
      }
    }
  } else {
    for(var i in map1_pos) {
      if(map1_pos[i].includes(type[0]) && map1_pos[i].includes(type[1])) {
        var row = table.insertRow(-1);
        var img = row.insertCell(0);
        var name = row.insertCell(1);
        img.innerHTML = '<img id="place-img" src="../images/' + map1_pos[i] + '.jpg" />';
        name.innerHTML = places[map1_pos.indexOf(map1_pos[i])];
      }
    }
  }
}

//filter Transportes
function update_map1() {
  var filename;
  var image = document.getElementById("city").src;
  var image2 = image.slice(-6);
  var filter = document.getElementById("filter").src;

  if(loc_type !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want to remove searched location?";
    filtered = "T";
    return undefined;
  }

  if(is_on_map[0] == 0) {
    is_on_map[last_position] = 0;
    has_location = 1;
    is_on_map[0] = 1;
    image2 = image2.replace(map_type + ".", "T.");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "T";
    last_position = 0;
    document.getElementById("filter").src = "../images/filter_act.png";
    document.getElementById("all-info").style.visibility = "visible";
  } else {
    has_location = 0;
    is_on_map[0] = 0;
    image2 = image2.replace(map_type + ".", ".");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "";
    document.getElementById("filter").src = "../images/filter.png";
    document.getElementById("places-button").style.visibility = "hidden";
  }
  document.getElementById("city").src = filename;
  updateInfo();
}

//filter Museus
function update_map2() {
  var filename;
  var image = document.getElementById("city").src;
  var image2 = image.slice(-6);

  if(loc_type !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want to remove searched location?";
    filtered = "M";
    return undefined;
  }

  if(is_on_map[1] == 0) {
    is_on_map[last_position] = 0;
    has_location = 1;
    is_on_map[1] = 1;
    image2 = image2.replace(map_type + ".", "M.");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "M";
    last_position = 1;
    document.getElementById("filter").src = "../images/filter_act.png";
    document.getElementById("all-info").style.visibility = "visible";
  } else {
    has_location = 0;
    is_on_map[1] = 0;
    image2 = image2.replace(map_type + ".", ".");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "";
    document.getElementById("filter").src = "../images/filter.png";
    document.getElementById("places-button").style.visibility = "hidden";
  }

  document.getElementById("city").src = filename;
  updateInfo();
}

//filter Restaurantes
function update_map3() {
  var filename;
  var image = document.getElementById("city").src;
  var image2 = image.slice(-6);

  if(loc_type !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want to remove searched location?";
    filtered = "R";
    return undefined;
  }

  if(is_on_map[2] == 0) {
    is_on_map[last_position] = 0;
    has_location = 1;
    is_on_map[2] = 1;
    image2 = image2.replace(map_type + ".", "R.");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "R";
    last_position = 2;
    document.getElementById("filter").src = "../images/filter_act.png";
    document.getElementById("all-info").style.visibility = "visible";
  } else {
    has_location = 0;
    is_on_map[2] = 0;
    image2 = image2.replace(map_type + ".", ".");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "";
    document.getElementById("filter").src = "../images/filter.png";
    document.getElementById("places-button").style.visibility = "hidden";
  }

  document.getElementById("city").src = filename;
  updateInfo();
}

//filter Parques
function update_map4() {
  var filename;
  var image = document.getElementById("city").src;
  var image2 = image.slice(-6);

  if(loc_type !== ""){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("places-button").innerHTML = "Are you sure you want to remove searched location?";
    filtered = "P";
    return undefined;
  }

  if(is_on_map[3] == 0) {
    is_on_map[last_position] = 0;
    has_location = 1;
    is_on_map[3] = 1;
    image2 = image2.replace(map_type + ".", "P.");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "P";
    last_position = 3;
    document.getElementById("filter").src = "../images/filter_act.png";
    document.getElementById("all-info").style.visibility = "visible";
  } else {
    has_location = 0;
    is_on_map[3] = 0;
    image2 = image2.replace(map_type + ".", ".");
    filename = image.slice(0, image.length - 6) + image2;
    map_type = "";
    document.getElementById("filter").src = "../images/filter.png";
    document.getElementById("places-button").style.visibility = "hidden";
  }

  document.getElementById("city").src = filename;
  updateInfo();
}

function clearFilter() {
  var filename;
  var image = document.getElementById("city").src;
  has_location = 0;
  is_on_map[last_position] = 0;
  filename = image.replace( map_type + ".", ".");
  map_type = "";

  document.getElementById("filter").src = "../images/filter.png";
  document.getElementById("city").src = filename;
  document.getElementById("all-info").style.visibility = "hidden";
}

function dropview() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
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

function zoom_in() {
  var image = document.getElementById("city");
  var image2 = image.src.slice(-10);

  if((!undo) && (!action.includes("zin"))){
    if(!action.includes("zout")){
      action.push("zin");
    }
    else{
      action = action.filter(e => e !== 'zout');
    }
  }
  else{
    undo = false;
  }

  if (image2.includes("2")) {
    image.src = '../images/city_map3' + loc_type + map_type + '.jpg';
  }
  else if(image2.includes("3")){
  }
  else {
    image.src = '../images/city_map2' + loc_type + map_type + '.jpg';
  }
  updateInfo();
}

function zoom_out() {
  var image = document.getElementById('city');
  var image2 = image.src.slice(-10);

  if((!undo) && (!action.includes("zout"))){
    if(!action.includes("zin")){
      action.push("zout");
    }
    else{
      action = action.filter(e => e !== 'zin');
    }
  }
  else{
    undo = false;
  }


  if (image2.includes("3")) {
    image.src = '../images/city_map2' + loc_type + map_type + '.jpg';
  }
  else{
    image.src = '../images/city_map' + loc_type + map_type + '.jpg';
  }
  updateInfo();
}

function textClick() {
  var keyboard = document.getElementById('keyboard');
  var close = document.getElementById('close_keys');
  var bracelet_txt = document.getElementById('bracelet_txt');
  var button = document.getElementById('help');
  var table = document.getElementById("places-info");

  if(!undo){
    action.push("txt");
  }
  else{
    undo = false;
  }

  if(table.style.visibility === "visible"){
    table.style.visibility = "hidden";
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

function homeClick(){
  var text = document.getElementById("search_box").value;
  var map = document.getElementById("city").src;
  //perhaps fazer uma click para todas as imagens do screen
  if(text !== "" || map !== "../images/city_map2.jpg" && !(action.length < 1)){
    document.getElementById("confirm").style.visibility = "visible";
    document.getElementById("confirm_txt").innerHTML = "Are you sure you want leave Maps? Progress will not be saved";
  }
  else {
    document.location.href = "home.html";
  }
}

function yesClick() {
  var text = document.getElementById("confirm_txt").innerHTML;

  if(text === "Are you sure you want to clear the filter?"){
      var pin = places.indexOf(searched);
      if(action.includes("zin")){
        document.getElementById("city").src = "../images/city_map3" + places_files[pin] + ".jpg";
        map_type = "";
      }
      else if (action.includes("zout")) {
        document.getElementById("city").src = "../images/city_map" + places_files[pin] + ".jpg";
        map_type = "";
      }
      else{
        document.getElementById("city").src = "../images/city_map2" + places_files[pin] + ".jpg";
        map_type = "";
      }
      loc_type = places_files[pin];
      search = "";
      document.getElementById("filter").src = "../images/filter.png";
  }

  if(text === "Are you sure you want leave Maps? Progress will not be saved"){
    document.location.href = "home.html";
  }

  var doc = document.getElementById("city");
  var image2 = doc.src.slice(-10);

  if(text === "Are you sure you want to remove searched location?"){
    loc_type = "";
    if(image2.includes(2)){
      document.getElementById("city").src = "../images/city_map2" + filtered + ".jpg";
      document.getElementById("filter").src = "../images/filter_act.png";
      map_type = filtered;
      filtered = "";
    }
    else if(image2.includes(3)){
      document.getElementById("city").src = "../images/city_map3" + filtered + ".jpg";
      document.getElementById("filter").src = "../images/filter_act.png";
      map_type = filtered;
      filtered = "";
    }
    else{
      document.getElementById("city").src = "../images/city_map" + filtered + ".jpg";
      document.getElementById("filter").src = "../images/filter_act.png";
      map_type = filtered;
      filtered = "";
    }
  }

  document.getElementById("confirm").style.visibility = "hidden";
  document.getElementById("confirm_txt").innerHTML = "";
}

function noClick() {
  document.getElementById("confirm").style.visibility = "hidden";
  document.getElementById("confirm_txt").innerHTML = "";
}

//WORK IN PROGRESS
function searchPlace(text){


  switch (text) {
    case "stations":
      update_map1();
      break;
    case "museums":
      update_map2();
      break;
    case "restaurants":
      update_map3();
      break;
    case "parks":
      update_map4();
      break;
    default:
      if(places.includes(text)){
        searched = text;
        if(map_type === ""){
          document.getElementById("confirm_txt").innerHTML = "Are you sure you want to clear the filter?";
          yesClick();
        }
        else{
          document.getElementById("confirm").style.visibility = "visible";
          document.getElementById("confirm_txt").innerHTML = "Are you sure you want to clear the filter?";
        }
      }
      else{
          document.getElementById("map_info").innerHTML = "It wasn't possible to find any place with the name " + text.fontcolor("red") +
          " <br> Please check if you have spelled it correctly with <br> one space between words and no extra spaces anywhere" +
          "<br> <br> Try searching something like: <br>-restaurant nameOfRestaurant";
          undo = true;
          helpClick();
      }
      break;
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
  }

function undoClick(){
  var last = action.pop();

  switch (last) {
    case "zin":
      undo = true;
      zoom_out();
      break;
    case "zout":
      undo = true;
      zoom_in();
      break;
    case "txt":
      undo = true;
      textClick();
      break;
    case "help":
      undo = true;
      helpClick();
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
