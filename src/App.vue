<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      color="primary"
      light
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">VLC&nbsp;<span class="font-weight-light">Media Player</span></span>
      <v-spacer></v-spacer>

      <v-btn icon v-on:click="toggleDarkMode()">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      :color="$vuetify.theme.themes[theme].background"
    >
      <v-list
        dense
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
            :to="item.to"
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
        class="fill-height"
        :style="{background: $vuetify.theme.themes[theme].background}"
      >
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import localConfig from '@/services/local-config';

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-play-box-multiple', text: 'Player', to: '/' },
      { icon: 'mdi-folder-multiple', text: 'Browse', to: '/browse' },
      { divider: true },
      { icon: 'mdi-video-wireless', text: 'Manage Streams' },
      { icon: 'mdi-audio-video', text: 'A/V Controls' },
      { divider: true },
      { icon: 'mdi-cog', text: 'Settings' },
      { icon: 'mdi-script-text', text: 'Send VLM Commands' },
      { icon: 'mdi-keyboard', text: 'Keyboard shortcuts' },
      { icon: 'mdi-information', text: 'About', to: '/about' },
    ],
    config: localConfig.getConfig(),
  }),
  computed: {
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  methods: {
    toggleDarkMode: function() {
      this.config.darkMode = !this.config.darkMode;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localConfig.saveConfig(this.config);
    }
  },
  mounted() {
    if (this.config.darkMode) {
      this.$vuetify.theme.dark = this.config.darkMode;
    }
  }
}
</script>

<style>
/* .v-navigation-drawer__border {
  display: none
} */
</style>