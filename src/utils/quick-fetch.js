export default async function quickFetch(endpoint, params) {
  if (params) {
    const url = new URL(endpoint);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    endpoint = url.toString();
  }
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}