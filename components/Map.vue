<template>
  <div></div>
</template>

<script>
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

export default {
  name: 'Map',
  mounted () {
    if (this.$isServer) { return }
    const zoomLevel = 15
    const location = [1.303757429122925, 49.15029606636458]
    setTimeout(() => {
      let map = new Map({
        target: 'place-map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat(location),
          zoom: zoomLevel
        })
      })

      let markers = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: require('~/assets/img/marker-icon.png')
          })
        })
      });
      map.addLayer(markers)

      let marker = new Feature(new Point(fromLonLat(location)))
      markers.getSource().addFeature(marker)

      map.render()
    }, 500)
  }
}
</script>
