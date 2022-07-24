import Vue from "vue";
import quickFetch from "./quick-fetch";

// API wrapper with polling support
async function withPolling(callback, interval) {
  const data = await callback();

  // If no polling interval is given, return an object w/ the data.
  if (!interval) return { data };

  // Otherwise, create a new `Vue.observable()`
  // instance and refetch the data according to
  // the polling interval.
  const observableData = Vue.observable({ data });
  const poll = () => {
    setTimeout(async () => {
      observableData.data = { ...(await callback()) };
      poll();
    }, interval);
  };
  poll();

  return observableData;
}

export default function api({ endpoint, interval }) {
  return withPolling(() => quickFetch(endpoint), interval);
}
