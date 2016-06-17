'use strict';

/* global mapboxgl */
if (!mapboxgl) throw new Error('include mapboxgl before mapbox-gl-scale.js');

var extend = require('xtend');

function _updateScale(map) {

  var y = map._container.clientHeight / 2;


  var maxMeters = distance(
        map.unproject([0, y]),
        map.unproject([100, y]));

  var meters = _getRoundNum(maxMeters);

  var ratio = meters / maxMeters;

    /* resolution defines meters per pixel */
  //var resolution = (78271.517  * Math.abs(Math.cos(map.getCenter().lat ) ) )/ (Math.pow(2,map.getZoom())); 

/* scale defines how many cm in reality is 1 cm on the screen and here dpi is taken as 96*/
  //var scale = 96 * 39.37 * resolution;

/* scale rounded off to lower whole number */
  //var centimeters = 4 * scale; //_getRoundNum(4 * scale);
  
  //var meters = Math.floor(centimeters) / 100;
  //console.log("scale1 " + scale);
  //console.log("scale2 " + 4 * scale);
  //console.log("scale3 " + centimeters);
  //console.log(Math.cos(map.getCenter().lat ) );
  ruler.style.width = 100 * ratio + 'px'; //centimeters / scale + 'cm';
  console.log("width" + ruler.style.width);
  ruler.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km'; 

}

function distance(latlng1, latlng2) {
  var R = 6371000;

  var rad = Math.PI / 180,
        lat1 = latlng1.lat * rad,
        lat2 = latlng2.lat * rad,
        a = Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlng2.lng - latlng1.lng) * rad);

  var maxMeters = R * Math.acos(Math.min(a, 1));
  return maxMeters;

}

function _getRoundNum(num) {
   var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
        d = num / pow10;

    d = d >= 10 ? 10 :
        d >= 5 ? 5 :
        d >= 3 ? 3 :
        d >= 2 ? 2 : 1;

    return pow10 * d;
}

function Scale() {
 // this.options = extend({}, this.options, options);
}

Scale.prototype = mapboxgl.util.inherit(mapboxgl.Control, {

  options: {
    position: 'top-left',
    zoom: 16,
    flyTo: true
  },


  onAdd: function(map) {
    this.container = this.options.container ?
      typeof this.options.container === 'string' ?
      document.getElementById(this.options.container) :
      this.options.container :
      map.getContainer();

          var el = document.createElement('div');
    el.className = 'mapboxgl-ctrl-scale';
    el.id = 'ruler';

     this.container.appendChild(el);

    console.log("Hi world");
    _updateScale(map);
     map.on('moveend', function() {
     _updateScale(map);
});

  },

});

if (window.mapboxgl) {
  mapboxgl.Scale = Scale;
} else if (typeof module !== 'undefined') {
  module.exports = Scale;
}