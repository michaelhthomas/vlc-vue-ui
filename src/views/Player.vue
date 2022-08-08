<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-alert v-if="status.connected == false" type="error">
        Disconnected
      </v-alert>
      <v-sheet class="player pa-8">
        <h1 v-if="status.filename">
          {{ status.filename }}
        </h1>
        <v-slider
          :value="status.time"
          :max="status.length"
          @change="status.seek($event)"
        >
          <template #prepend>
            <span class="v-label">
              {{ status.timeFormat }}
            </span>
          </template>
          <template #append>
            <span class="v-label">
              {{ status.lengthFormat }}
            </span>
          </template>
        </v-slider>
        <div class="text-center mb-8">
          <v-btn
            v-shortkey="['s']"
            class="mx-2"
            icon
            @shortkey="status.stop"
            @click="status.stop"
          >
            <v-icon>mdi-stop</v-icon>
          </v-btn>
          <v-chip x-large outlined>
            <v-btn
              v-shortkey="['b']"
              class="mx-2"
              icon
              @shortkey="status.prev"
              @click="status.prev"
            >
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn
              v-shortkey="['space']"
              class="mx-2"
              fab
              dark
              color="primary"
              @shortkey="status.playPause"
              @click="status.playPause"
            >
              <v-icon v-if="status.state == 'playing'" dark>mdi-pause</v-icon>
              <v-icon v-else dark>mdi-play</v-icon>
            </v-btn>
            <v-btn
              v-shortkey="['n']"
              class="mx-2"
              icon
              @shortkey="status.next"
              @click="status.next"
            >
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
          </v-chip>
          <v-btn
            v-shortkey="['f']"
            class="mx-2"
            icon
            @shortkey="status.toggleFullscreen"
            @click="status.toggleFullscreen"
          >
            <v-icon>mdi-fullscreen</v-icon>
          </v-btn>
        </div>
        <v-divider />
        <Playlist />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import Playlist from "@/components/Playlist.vue";
import { useStatus } from "@/stores/status.store";

export default {
  name: "Home",
  components: {
    Playlist,
  },
  setup() {
    const status = useStatus();

    return {
      // you can return the whole store instance to use it in the template
      status,
    };
  },
};
</script>
