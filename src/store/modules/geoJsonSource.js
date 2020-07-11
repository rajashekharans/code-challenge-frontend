import getGeoJsonSource from '@/api';

const state = {
  all: undefined,
  selectedProperty: 0,
};

const getters = {
  getAllProperties: (state) => {
    if (!state.all) return [];

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
  getSelectedProperty: (state) => {
    if (state.selectedProperty === 0) return [0, 0];

    const currentProperty = getters.getAllProperties(state)
      .find((property) => property.id === state.selectedProperty);

    return currentProperty.coordinates;
  },
  getGeoJsonSource: (state) => (state.all),
};

const actions = {
  async fetchAll({ commit }) {
    const response = await getGeoJsonSource();
    commit('setGeoJsonSources', response);
  },
  setProperty({ commit }, { property }) {
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
