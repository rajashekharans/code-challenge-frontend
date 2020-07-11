import geoJsonSource from './testBlob.json';

export default function getGeoJsonSource() {
  return {
    type: 'geojson',
    data: geoJsonSource,
  };
}
