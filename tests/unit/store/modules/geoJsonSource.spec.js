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

  it('getGeoJsonSource returns all the properties', () => {   
    const state = {
      all: geoJsonSourceMock,
    }
    const result = geoJsonSourceStore.getters.getGeoJsonSource(state);

    expect(result.type).toEqual('geojson');
    expect(result.data).toEqual(testBlob);
  });

  it('getAllProperties returns empty array if state.all is not set', () => {   
    const state = {
      all: undefined,
    }
    
    const result = geoJsonSourceStore.getters.getAllProperties(state);

    expect(result).toEqual([]);
  });

  it('getAllProperties returns all formatted properties', () => {   
    const state = {
      all: geoJsonSourceMock,
    }
    
    const result = geoJsonSourceStore.getters.getAllProperties(state);

    expect(result[0]).toMatchObject({
      'id': '7426971',
      'title': 'HELLENIC CLUB',
      'coordinates': [
        151.209152,
        -33.875305
      ]
    });
  });

  it('getSelectedProperty returns [0,0] if selected property is not set', () => {   
    const state = {
      all: geoJsonSourceMock,
      selectedProperty: 0
    }

    const result = geoJsonSourceStore.getters.getSelectedProperty(state);
    
    expect(result).toEqual([0, 0]);
  });

  it('getSelectedProperty returns selected property coordinates', () => {   
    const state = {
      all: geoJsonSourceMock,
      selectedProperty: '7426971'
    }

    const result = geoJsonSourceStore.getters.getSelectedProperty(state);
    
    expect(result).toEqual([151.209152, -33.875305]);
  });

  it('Should fetch all properties', async () => {
    const commit = jest.fn();

    await geoJsonSourceStore.actions.fetchAll({ commit });
    expect(commit).toHaveBeenCalledWith('setGeoJsonSources', geoJsonSourceMock);
  });

  it('Should set the selected property id', async () => {
    const commit = jest.fn();

    geoJsonSourceStore.actions.setProperty({ commit }, { property: '7426971' } );
    
    expect(commit).toHaveBeenCalledWith('setSelectedProperty', '7426971');
  });

  it('fetchAll set `state.all` by mutation setGeoJsonSources', async () => {   
    const store = createGeoJsonSourceStore();
   
    await store.dispatch('fetchAll');
    const result = store.getters.getGeoJsonSource;

    expect(result).toEqual(geoJsonSourceMock);
  });

  it('setProperty rset `state.selectedProperty` by mutation setSelectedProperty', () => {   
    const store = createGeoJsonSourceStore('7426971');

    store.dispatch('setProperty', { property: '7426971' } );
    const result = store.getters.getSelectedProperty;
    
    expect(result).toEqual([151.209152, -33.875305]);
  });
});
