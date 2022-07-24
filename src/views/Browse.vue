<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-sheet class="player pa-8" style="user-select: none">
        <h1 class="mb-4">Media Browser</h1>
        <!-- File Browser -->
        <v-item-group v-model="selected" class="d-flex flex-wrap">
          <v-item
            v-for="item in items"
            v-slot="{ active, toggle }"
            :key="item.id"
          >
            <v-sheet
              class="pa-2 mr-4 mb-4 text-center text-truncate"
              width="120"
              height="120"
              :color="active ? 'primary' : 'secondary'"
              @click="toggle"
              @dblclick="test"
            >
              <v-icon v-if="!item.file" large> mdi-folder </v-icon>
              <v-icon v-else large>
                {{
                  files[getFileExt(item.name)]
                    ? files[getFileExt(item.name)]
                    : files["unknown"]
                }}
              </v-icon>
              <br />
              <span>
                {{ item.name }}
              </span>
            </v-sheet>
          </v-item>
        </v-item-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
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
      txt: "mdi-file-document-outline",
      xls: "mdi-file-excel",
      unknown: "mdi-file",
    },
    tree: [],
    items: [
      {
        name: ".git",
      },
      {
        name: "node_modules",
      },
      {
        name: "public",
        children: [
          {
            name: "static",
            children: [
              {
                name: "logo.png",
                file: "png",
              },
            ],
          },
          {
            name: "favicon.ico",
            file: "png",
          },
          {
            name: "index.html",
            file: "html",
          },
        ],
      },
      {
        name: ".gitignore",
        file: "txt",
      },
      {
        name: "babel.config.js",
        file: "js",
      },
      {
        name: "package.json",
        file: "json",
      },
      {
        name: "README.md",
        file: "md",
      },
      {
        name: "vue.config.js",
        file: "js",
      },
      {
        name: "WHAP Vocab- Unit 7 - Airtable.pdf",
        file: "txt",
      },
    ],
  }),
  methods: {
    test: function () {
      alert("This works somehow");
    },
    getFileExt: function (name) {
      return name.substring(name.lastIndexOf(".") + 1).toLowerCase();
    },
  },
};
</script>
