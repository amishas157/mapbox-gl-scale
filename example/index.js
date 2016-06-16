'use strict';
/* global mapboxgl */

require('../');
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pc2hhczE1NyIsImEiOiJjaW1uOWNkMnEwMGQxdHNtNHdiamd3b2dyIn0.V0u5PjZhjKeJ0SKBMRqLeg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [-79.4512, 43.6568],
  zoom: 13
});

var scale = new mapboxgl.Scale();
var button = document.createElement('button');
button.textContent = 'click me';

map.getContainer().querySelector('.mapboxgl-ctrl-bottom-left').appendChild(button);
map.addControl(scale);
