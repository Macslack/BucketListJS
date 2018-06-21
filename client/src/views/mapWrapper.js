const MapWrapper = function(element, coords, zoom){
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  this.map = L.map(element).addLayer(osmLayer).setView(coords, zoom);
  this.map.on('click', function(event){
    this.addMarker(event.latlng);
    console.log(event.latlng);

  }.bind(this))

}


MapWrapper.prototype.addMarker = function(coords){
  L.marker(coords).addTo(this.map);

};


module.exports = MapWrapper;
