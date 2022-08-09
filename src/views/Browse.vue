<template>
  <v-row justify="center" class="align-self-start">
    <v-col cols="12" sm="10" class="my-sm-12">
      <v-sheet class="player" style="user-select: none">
        <div>
          <v-btn inline tile text large class="btn-short px-3">
            <v-icon v-if="tree.path.root" @click="uri = 'file:///'">
              mdi-harddisk
            </v-icon>
            <v-icon v-else @click="uri = 'file://~'">mdi-home</v-icon>
          </v-btn>
          <span v-for="(folder, i) in tree.path.folders" :key="i">
            <v-icon class="px-1">mdi-chevron-right</v-icon>
            <v-btn
              inline
              tile
              text
              large
              class="btn-short px-3"
              @click="uri = folder.uri"
            >
              {{ folder.name }}
            </v-btn>
          </span>
        </div>

        <v-divider></v-divider>

        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left" style="width: 0px"></th>
                <th class="text-left">Name</th>
                <th class="text-left d-none d-sm-table-cell">Type</th>
                <th class="text-left" style="width: 0px">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in tree.files"
                :key="item.name"
                @dblclick="handleClick(item)"
              >
                <td>
                  <v-icon v-if="item.type == 'dir' && item.name == '..'" large>
                    mdi-arrow-up
                  </v-icon>
                  <v-icon v-else-if="item.type == 'dir'" large>
                    mdi-folder
                  </v-icon>
                  <v-icon v-else large>
                    {{
                      files[getFileExt(item.name)]
                        ? files[getFileExt(item.name)]
                        : files["unknown"]
                    }}
                  </v-icon>
                </td>
                <td class="td-truncate">{{ item.name }}</td>
                <td class="d-none d-sm-table-cell">{{ item.type == "file" ? getFileExt(item.name) : "" }}</td>
                <td>
                  <div
                    v-if="item.type == 'file'"
                    class="d-flex"
                    style="gap: 10px"
                  >
                    <v-tooltip left>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          outlined
                          v-bind="attrs"
                          @click="play(item)"
                          v-on="on"
                        >
                          <v-icon>mdi-play</v-icon>
                        </v-btn>
                      </template>
                      <span>Play</span>
                    </v-tooltip>
                    <v-tooltip right>
                      <template #activator="{ on, attrs }">
                        <v-btn
                          color="grey"
                          outlined
                          v-bind="attrs"
                          @click="enqueue(item)"
                          v-on="on"
                        >
                          <v-icon>mdi-playlist-plus</v-icon>
                        </v-btn>
                      </template>
                      <span>Enqueue</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import browseService from "@/services/browse";

export default {
  name: "Browse",
  data: () => ({
    uri: "file://~",
    files: {
      html: "mdi-language-html5",
      js: "mdi-nodejs",
      json: "mdi-code-json",
      md: "mdi-language-markdown",
      pdf: "mdi-file-pdf",
      png: "mdi-file-image",
      jpg: "mdi-file-image",
      jpeg: "mdi-file-image",
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      unknown: "mdi-file",
    },
    tree: {
      path: [],
      files: [],
    },
  }),
  watch: {
    uri(newUri) {
      this.loadFiles(newUri);
    },
  },
  mounted() {
    this.loadFiles(this.uri);
  },
  methods: {
    test: function () {
      alert("This works somehow");
    },
    async loadFiles(uri) {
      this.tree = await browseService.list(uri);
    },
    getFileExt: function (name) {
      return name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    },
    handleClick(file) {
      if (file.type == "dir") this.uri = file.uri;
      else browseService.play(file.uri);
    },
    play(file) {
      browseService.play(file.uri);
    },
    enqueue(file) {
      browseService.enqueue(file.uri);
    },
  },
};
</script>

<style scoped>
.btn-short {
  min-width: inherit !important;
}

td {
  white-space: nowrap;
}

.td-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 0;
}
</style>
