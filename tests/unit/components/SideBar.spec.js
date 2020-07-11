import Vuex from 'vuex';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import SideBar from '@/components/SideBar.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('SideBar', () => {
  let store;

  beforeEach(() => {
    const geoJsonSourceState = {
      all:[],
    };

    const geoJsonSourceActions = {
      setProperty: jest.fn(),
    };

    const geoJsonSourceGetters = {
        getAllProperties: jest.fn(),
      };

    store = new Vuex.Store({
      modules: {
        geoJsonSource: {
          namespaced: true,
          state: geoJsonSourceState,
          getters: geoJsonSourceGetters,
          actions: geoJsonSourceActions,
        },
      },
    });
  });

  it('renders app heading when component loads', () => {
    const wrapper = shallowMount(SideBar, {
      store,
      localVue,
    });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('#select-property-header').exists()).toBe(true);
  });

  it('renders dropdown description when component loads', () => {
    const wrapper = shallowMount(SideBar, {
      store,
      localVue,
    });

    expect(wrapper.find('#select-property-title').exists()).toBe(true);
  });
});