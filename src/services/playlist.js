import api from '../utils/api';

const server = window.location.origin;
const playlistEndpoint = `${server}/requests/playlist.json`

export default {
  get: () => api({ 'endpoint': playlistEndpoint, interval: 1000 })
};