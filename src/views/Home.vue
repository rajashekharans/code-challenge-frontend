<template>
  <a-layout>
    <SideBar />
    <MapDisplay />
  </a-layout>
</template>

<script>
import { mapActions } from 'vuex';
import MapDisplay from '@/components/MapDisplay.vue';
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'Home',
  components: {
    MapDisplay,
    SideBar,
  },
  methods: {
    ...mapActions('geoJsonSource', [
      'fetchAll',
    ]),
  },
  created() {
    this.fetchAll();
  },
};
</script>
