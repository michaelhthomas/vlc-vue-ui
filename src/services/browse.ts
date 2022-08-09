import quickFetch from "../utils/quick-fetch";
import statusService from "./status";

const server = window.location.origin;
const browseEndpoint = `${server}/requests/browse.json`;

const get = (uri: string) => quickFetch(browseEndpoint, { uri });

let homeFolder: string = (await get("file://~")).element[0].path;
homeFolder = homeFolder.substr(0, homeFolder.lastIndexOf("/"));

const getPath = (uri: string) => {
  uri = decodeURI(uri);

  const root = !uri.includes(homeFolder) && !uri.includes("~");

  const folders = uri
    .replace("file://", "")
    .replace(homeFolder, "")
    .replace("~", "")
    .split("/")
    .filter((n) => n);

  const folderObjs = folders.map((name, index) => {
    let uri = root ? "file://" : `file://${homeFolder}`;
    for (let i = 0; i <= index; i++) {
      uri += "/" + folders[i];
    }
    return {
      name,
      uri,
    };
  });

  return {
    root,
    folders: folderObjs,
  };
};

const list = async (uri: string) => {
  const files = await get(uri);
  const path = getPath(uri);

  return {
    path,
    files: files.element,
  };
};

const play = (uri: string) =>
  statusService.sendRequest({ command: "in_play", input: uri });

const enqueue = (uri: string) =>
  statusService.sendRequest({ command: "in_enqueue", input: uri });

export default {
  get,
  list,
  play,
  enqueue,
};
