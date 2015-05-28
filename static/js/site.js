maps = [];

$(document).ready(function(){
  
  /* NAVIGATION EXPAND
   *
   *
   */
  $('#nav-expand').on('click', function(){
    $('#nav').slideToggle(300);
    $(this).toggleClass('open');
    if($(this).hasClass('open')) {
      $(this).html('<i class="fa fa-times"></i>');
    } else {
      $(this).html('<i class="fa fa-bars"></i>');
    }
  });

  /* MAPS
   * This builds a map if the element is specified with class .map-marker
   * It only requires latitude and longitude, which can be passed as attributes
   * in the .map-marker element like data-latitude & data-longitude.
   * If a .map-marker element exists, run buildData() on each of the instances.
   *
   */
  var mapElems = document.getElementsByClassName('map-marker');
  if (mapElems.length > 0) {
    for ( var m = 0; m < mapElems.length; m++ ) buildMapMarker(mapElems[m]);
  }

});

function buildMapMarker(elem) {
  L.mapbox.accessToken = 'pk.eyJ1IjoiY3Vnb3MiLCJhIjoidGNnSlBNTSJ9.qPHDxAemDindkSskKNv90g';
  var coordinates = [elem.getAttribute('data-latitude'), elem.getAttribute('data-longitude')];
  var map = L.mapbox.map(elem.id, 'cugos.ma6ck6l4').setView(coordinates, 14);
  if (!elem.getAttribute('data-scrollZoom')) map.scrollWheelZoom.disable();
  var marker = L.marker(coordinates, {
    icon: L.mapbox.marker.icon({
      'marker-size': 'large',
      'marker-symbol': 'building',
      'marker-color': '#3f75a2'
    })
  }).addTo(map);
  if (elem.getAttribute('data-popup')) marker.bindPopup(elem.getAttribute('data-popup'));
  maps.push(map);
}