//Es para capturar el json
$(document).ready(function(){
  $.ajax({
    headers: { 'X-Auth-Token': 'fde5a1f0272843dd9e9ac3896a81f816' },
    url: 'https://www.football-data.org/v1/competitions',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    console.log(response);
    CrearLiga(response);
  });
});

function CrearLiga(liga){
  $("#equipos").innerHTML = "";
  for (var i = 0; i < liga.length; i++) {
    $("#ligas").append("<option value="+liga[i].id+">"+liga[i].caption+"</option>");
  }
}

function equipos(){
  console.log($("#ligas").val());
  $.ajax({
    headers: { 'X-Auth-Token': 'fde5a1f0272843dd9e9ac3896a81f816' },
    url: 'https://www.football-data.org/v1/competitions/'+$("#ligas").val()+'/teams',
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    console.log(response);
    CrearEquipos(response);
    console.log("creado");
  });
};

function CrearEquipos(equipo){
  $("#equipos").html("");
  for (var i = 0; i < equipo.teams.length; i++) {
    $("#equipos").append("<option value="+equipo.teams[i]._links.players.href+">"+equipo.teams[i].name+"</option>");
  }
}
function jugadores(){
  console.log($("#equipos").val());
  $.ajax({
    headers: { 'X-Auth-Token': 'fde5a1f0272843dd9e9ac3896a81f816' },
    url: $("#equipos").val(),
    dataType: 'json',
    type: 'GET',
  }).done(function(response) {
    console.log(response);
    CrearJugadores(response);
    console.log("creado");
  });
};

function CrearJugadores(jugadores){
  $("#jugadores").html("");
  if(jugadores.players.length==0){
    $("#jugadores").append("<h1>No hay jugadores</h1>");
  }else{
    var clase = "col-sm-4";
    var bordes = "bordes"
    for (var i = 0; i < jugadores.players.length; i++) {
    $("#jugadores").append("<div class="+clase+"><div class="+bordes+"<h4>Nombre: </h4><p>"+jugadores.players[i].name+"</p><h4>Posicion: </h4><p>"+jugadores.players[i].position+"</p><h4>Numero: </h4><p>"+jugadores.players[i].jerseyNumber+"</p><h4>Fecha de nacimiento: </h4><p>"+jugadores.players[i].dateOfBirth+"</p><h4>Nacionalidad: </h4><p>"+jugadores.players[i].nationality+"</p></div></div>");
    }

  }
}
