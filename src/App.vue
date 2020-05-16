<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="orange darken-1"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">VLC&nbsp;<span class="font-weight-light">Media Player</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-divider
            v-if="item.divider"
            :key="i"
            dark
            class="my-4"
          ></v-divider>
          <v-list-item
            v-else
            :key="i"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container
        fluid
        class="grey lighten-4 fill-height"
      >
        <!-- <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
          </v-col>
        </v-row> -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [
        { icon: 'mdi-play-box-multiple', text: 'Player' },
        { icon: 'mdi-folder-multiple', text: 'Browse' },
        { divider: true },
        { icon: 'mdi-video-wireless', text: 'Manage Streams' },
        { icon: 'mdi-audio-video', text: 'A/V Controls' },
        { divider: true },
        { icon: 'mdi-cog', text: 'Settings' },
        { icon: 'mdi-script-text', text: 'Send VLM Commands' },
        { icon: 'mdi-help', text: 'Help' },
        { icon: 'mdi-keyboard', text: 'Keyboard shortcuts' },
      ],
    }),
  }
</script>

<style>
/* .v-navigation-drawer__border {
  display: none
} */
</style>