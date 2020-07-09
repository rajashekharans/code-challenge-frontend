<template>
  <a-layout>
    <a-layout-content id="layout-content">
      <div id="content">
        <MglMap
          :accessToken="accessToken"
          :mapStyle="mapStyle"
          :container="container"
          :center="center"
          :zoom="zoom"
          @load="onMapLoad"
        >
          <MglGeojsonLayer
            sourceId="mySource"
            :source="geoJsonSource"
            layerId="myLayer"
            :layer="geoJsonLayer"
          />
          <MglMarker :coordinates="coordinates" color="red" />
        </MglMap>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Mapbox from 'mapbox-gl';
import {
  MglMap,
  MglGeojsonLayer,
  MglMarker,
} from 'vue-mapbox';

export default {
  name: 'MapDisplay',
  components: {
    MglMap,
    MglGeojsonLayer,
    MglMarker,
  },
  computed: {
    ...mapGetters('geoJsonSource', {
      geoJsonSource: 'getGeoJsonSource',
      selectedProperty: 'getSelectedProperty',
    }),
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      container: 'map',
      center: [0, 0],
      coordinates: [0, 0],
      zoom: 17,
      geoJsonLayer: {
        type: 'circle',
        paint: {
          'circle-color': 'red',
        },
      },
      mapBoxActions: undefined,
    };
  },
  created() {
    this.mapbox = Mapbox;
    this.center = [151.206284, -33.877769];
    this.coordinates = [151.206284, -33.877769];
  },
  methods: {
    async onMapLoad(event) {
      // Here we cathing 'load' map event
      this.mapBoxActions = event.component.actions;
    },
  },
  watch: {
    async selectedProperty(newVal) {
      if (newVal !== undefined && this.mapBoxActions !== undefined) {
        await this.mapBoxActions.flyTo({
          center: newVal,
          zoom: 17,
          speed: 1,
        });
        this.coordinates = newVal;
      }
    },
  },
};

</script>
<style scoped>
  #layout-content {
    margin: '24px 16px';
  }

  #content {
    background-color: white;
    display: block;
    overflow: auto;
    height: 100vh;
  }
</style>
