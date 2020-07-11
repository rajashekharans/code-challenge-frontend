<template>
  <a-layout-sider
    breakpoint="lg"
    collapsed-width="40"
    :style="{ minWidth: '300px', height: '100vh'}"
  >
    <p id="select-property-header">
      <span class="nav-text">MapBox Vue App</span>
    </p>
    <p id="select-property-title">
      <span class="nav-text">To navigate,</span>
      <br/>
      <span class="nav-text">select property from drop down</span>
    </p>

    <a-select
      placeholder="Select the property"
      style="width: 250px"
      @change="(property) => setProperty({ property })"
    >
      <a-select-option v-for="property in properties" :key="property.id">
        {{ property.title }}
      </a-select-option>
    </a-select>

  </a-layout-sider>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SideBar',
  computed: {
    ...mapGetters('geoJsonSource', {
      properties: 'getAllProperties',
    }),
  },
  methods: {
    ...mapActions('geoJsonSource', [
      'setProperty',
    ]),
  },
};
</script>
<style scoped>
  #select-property-title {
    margin-top: 40px;
    color: #fff;
  }
  #select-property-header {
    margin-top: 40px;
    color: #fff;
    font-size: x-large;
  }
</style>
