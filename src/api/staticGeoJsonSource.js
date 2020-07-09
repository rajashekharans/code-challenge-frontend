import geoJsonSource from './testBlob.json';

export default {
  async getGeoJsonSource() {
    return {
      type: 'geojson',
      data: geoJsonSource,
    };
  },
};
