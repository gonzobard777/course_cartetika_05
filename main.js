const map = new maplibregl.Map({
  container: 'map',
  style: 'https://raw.githubusercontent.com/gtitov/basemaps/refs/heads/master/positron-nolabels.json',
  center: [55.624, 37.584],
  zoom: 7,
  hash: true,
});


map.on('load', () => {

  map.addSource('grid', {
    type: 'vector',
    url: 'http://localhost:3000/grid',
  })

  map.addSource('oikonyms', {
    type: 'vector',
    // url: 'http://localhost:3000/oikonyms',
    tiles: ['http://localhost:3000/oikonyms/{z}/{x}/{y}'],
  })

  map.addLayer({
    id: 'grid-layer',
    source: 'grid',
    'source-layer': 'grid',
    type: 'fill',
    paint: {
      'fill-color': [
        'interpolate', ['linear'],
        ['to-number', ['get', 'sum_pop']],
        0, '#440154',
        100, '#39568c',
        1000, '#1f968b',
        10000, '#fde725'
      ]
    }
  })

  map.addLayer({
    id: 'oikonyms-layer',
    source: 'oikonyms',
    'source-layer': 'oikonyms',
    type: 'circle',
    paint: {
      'circle-color': '#1a9641',
      'circle-radius': 6,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#FFF',
      'circle-opacity': 0.8
    }
  })

});