import { createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import testBlob from '@/api/testBlob.json';

import geoJsonSourceStore from '@/store/modules/geoJsonSource';

Vue.use(Vuex);

const geoJsonSourceMock = {
  type: 'geojson',
  data: testBlob,
};

function createGeoJsonSourceStore(selectedProperty = 0) {
  return new Vuex.Store({
    state: {
      all: geoJsonSourceMock,
      selectedProperty,
    },
    getters: geoJsonSourceStore.getters,
    actions: geoJsonSourceStore.actions,
    mutations: geoJsonSourceStore.mutations,
  });
}

describe('GeoJsonSource store', () => {
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
  });

  it('getAllProperties returns null, state all is not set', () => {   
    const store = createGeoJsonSourceStore();

    const result = store.getters.getAllProperties;

    expect(result).toEqual([]);
  });

  it('getGeoJsonSource returns all Properties from store', async () => {   
    const store = createGeoJsonSourceStore();
   
    await store.dispatch('fetchAll');
    const result = store.getters.getGeoJsonSource;

    expect(result).toEqual(geoJsonSourceMock);
  });

  it('getAllProperties returns all formatted properties', () => {   
    const store = createGeoJsonSourceStore();

    const result = store.getters.getAllProperties;

    expect(result[0]).toMatchObject({'id': '7426971', 'title': 'HELLENIC CLUB', 'coordinates': [151.209152, -33.875305]});
  });

  it('getSelectedProperty returns [0,0] if selected property is not set', () => {   
    const store = createGeoJsonSourceStore();

    const result = store.getters.getSelectedProperty;
    
    expect(result).toEqual([0, 0]);
  });

  it('getSelectedProperty returns selected property coordinates', () => {   
    const store = createGeoJsonSourceStore('7426971');

    store.dispatch('setProperty', { property: '7426971' } );
    const result = store.getters.getSelectedProperty;
    
    expect(result).toEqual([151.209152, -33.875305]);
  });
});