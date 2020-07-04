<template>
  <a-layout-sider
    breakpoint="lg"
    collapsed-width="0"
    :style="{ minWidth: '300px', height: '100vh'}"
  >
    <a-menu theme="dark" mode="inline">
      <a-menu-item id="select-property-drop-down">
        <span class="nav-text">Select property from drop down</span>
      </a-menu-item>
      <a-select
        placeholder="Select the property"
        style="width: 250px"
        @change="(property) => setProperty({ property })"
      >
        <a-select-option v-for="property in properties" :key="property.id">
          {{ property.title }}
        </a-select-option>
      </a-select>
    </a-menu>
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
  #select-property-drop-down {
    margin-top: 40px;
  }
</style>
