import quickFetch from "../utils/quick-fetch";
import statusService from "./status";

export default class BrowseService {
  private static server = window.location.origin;
  private static browseEndpoint = `${this.server}/requests/browse.json`;

  private static _homeFolder: string;

  private static get homeFolder() {
    return (async () => {
      if (this._homeFolder) return this._homeFolder;

      this._homeFolder = await this.getHomeFolder();
      return this._homeFolder;
    })();
  }

  private static async getHomeFolder() {
    let homeFolder = (await this.get("file://~")).element[0].path;
    return homeFolder.substr(0, homeFolder.lastIndexOf("/"));
  }

  private static async getPath(uri: string) {
    uri = decodeURI(uri);
    const homeFolder = await this.homeFolder;

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
  }

  static get = (uri: string) => quickFetch(this.browseEndpoint, { uri });
  static list = async (uri: string) => {
    const files = await this.get(uri);
    const path = await this.getPath(uri);
    return {
      path,
      files: files.element,
    };
  };
  static play = (uri: string) =>
    statusService.sendRequest({ command: "in_play", input: uri });
  static enqueue = (uri: string) =>
    statusService.sendRequest({ command: "in_enqueue", input: uri });
}
