'use strict';

/* global mapboxgl */
if (!mapboxgl) throw new Error('include mapboxgl before mapbox-gl-scale.js');

var extend = require('xtend');

function _updateScale(map) {
    /* resolution defines meters per pixel */
  var resolution = (156543.034 * Math.abs(Math.cos(map.getCenter().lat * (180 / Math.PI) ) ) )/ (Math.pow(2,map.getZoom())); 

/* scale defines how many cm in reality is 1 cm on the screen and here dpi is taken as 96*/
  var scale = 96 * 39.37 * resolution;

/* scale rounded off to lower whole number */
  var centimeters = _getRoundNum(4 * scale);
  var meters = centimeters / 100;
  console.log("scale1 " + scale);
  console.log("scale2 " + 4 * scale);
  console.log("scale3 " + centimeters);

  ruler.style.width = centimeters / scale + 'cm';
  console.log("width" + ruler.style.width);
  ruler.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km'; 

}

function _getRoundNum(num) {
    var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
        d = Math.floor(num / pow10);

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