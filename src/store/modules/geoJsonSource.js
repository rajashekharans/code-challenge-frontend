import geoJsonSource from '@/api/staticGeoJsonSource';

const state = {
  all: [],
  selectedProperty: 0,
};

const getters = {
  getAllProperties: () => {
    if (state.all.length === 0) return [];

    const data = state.all.data.features;
    const items = data.map((item) => {
      const property = {
        id: item.properties.id,
        coordinates: item.geometry.coordinates,
        title: item.properties.project.Title,
      };

      return property;
    });

    return items;
  },
  getSelectedProperty: () => {
    if (state.selectedProperty === 0) return [0, 0];

    const currentProperty = getters.getAllProperties()
      .find((property) => property.id === state.selectedProperty);

    return currentProperty.coordinates;
  },
  getGeoJsonSource: () => state.all,
};

const actions = {
  async fetchAll({ commit }) {
    const response = await geoJsonSource.getGeoJsonSource();
    commit('setGeoJsonSources', response);
  },
  async setProperty({ commit }, { property }) {
    commit('setSelectedProperty', property);
  },

};

const mutations = {
  setGeoJsonSources(_, geoJsonSources) {
    state.all = geoJsonSources;
  },
  setSelectedProperty(_, geoJsonSources) {
    state.selectedProperty = geoJsonSources;
  },
};

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state,
};
