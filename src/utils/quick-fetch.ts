export default async function quickFetch(
  endpoint: string,
  urlParams: { [key: string]: string }
) {
  if (urlParams) {
    const url = new URL(endpoint);
    (Object.keys(urlParams) as Array<keyof typeof urlParams>).forEach((key) =>
      url.searchParams.append(key as string, urlParams[key])
    );
    endpoint = url.toString();
  }
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}
