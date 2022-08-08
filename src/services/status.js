import api from "../utils/api";
import quickFetch from "../utils/quick-fetch";

const server = window.location.origin;
const statusEndpoint = `${server}/requests/status.json`;

export default {
  get: () => api({ endpoint: statusEndpoint, interval: 500 }),
  getOnce: () => api({ endpoint: statusEndpoint }),
  sendCommand: (command) => quickFetch(statusEndpoint, { command: command }),
  sendRequest: (params) => quickFetch(statusEndpoint, params),
};
