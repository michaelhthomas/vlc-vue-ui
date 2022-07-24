<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10">
      <v-sheet class="player pa-8">
        <h1 v-if="status.data.information">
          {{ status.data.information.category.meta.filename }}
        </h1>
        <v-slider
          :value="status.data.time"
          :max="status.data.length"
          @change="
            sendRequest({
              command: 'seek',
              val: $event,
            })
          "
        >
          <template #prepend>
            <span class="v-label">
              {{ secToTime(status.data.time) }}
            </span>
          </template>
          <template #append>
            <span class="v-label">
              {{ secToTime(status.data.length) }}
            </span>
          </template>
        </v-slider>
        <div class="text-center mb-8">
          <v-btn class="mx-2" icon @click="sendCommand('pl_stop')">
            <v-icon>mdi-stop</v-icon>
          </v-btn>
          <v-chip x-large outlined>
            <v-btn class="mx-2" icon @click="sendCommand('pl_previous')">
              <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              fab
              dark
              color="primary"
              @click="sendCommand('pl_pause')"
            >
              <v-icon v-if="status.data.state == 'playing'" dark
                >mdi-pause</v-icon
              >
              <v-icon v-else dark>mdi-play</v-icon>
            </v-btn>
            <v-btn class="mx-2" icon @click="sendCommand('pl_next')">
              <v-icon>mdi-skip-next</v-icon>
            </v-btn>
          </v-chip>
          <v-btn class="mx-2" icon @click="sendCommand('fullscreen')">
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
import statusService from "@/services/status";
import secToTime from "@/utils/sec-to-time";

export default {
  name: "Home",
  components: {
    Playlist,
  },
  data() {
    return {
      status: {
        data: {
          fullscreen: true,
          stats: {
            inputbitrate: 2.4978013038635,
            sentbytes: 0,
            lostabuffers: 0,
            averagedemuxbitrate: 0,
            readpackets: 4062,
            demuxreadpackets: 0,
            lostpictures: 0,
            displayedpictures: 1250,
            sentpackets: 0,
            demuxreadbytes: 43302624,
            demuxbitrate: 2.9027037620544,
            playedabuffers: 860,
            demuxdiscontinuity: 2,
            decodedaudio: 1721,
            sendbitrate: 0,
            readbytes: 43622785,
            averageinputbitrate: 0,
            demuxcorrupted: 0,
            decodedvideo: 833,
          },
          aspectratio: "default",
          audiodelay: 0,
          apiversion: 3,
          currentplid: 3,
          time: 17,
          volume: 256,
          length: 127,
          random: false,
          audiofilters: { filter_0: "" },
          rate: 1,
          videoeffects: {
            hue: 0,
            saturation: 1,
            contrast: 1,
            brightness: 1,
            gamma: 1,
          },
          state: "playing",
          loop: false,
          version: "3.0.10 Vetinari",
          position: 0.13496536016464,
          information: {
            chapter: 0,
            chapters: [],
            title: 0,
            category: {
              "Stream 0": {
                Decoded_format: "",
                Color_transfer_function: "ITU-R BT.709",
                Chroma_location: "Left",
                Video_resolution: "1920x1080",
                Frame_rate: "23.976024",
                Codec: "H264 - MPEG-4 AVC (part 10) (avc1)",
                Orientation: "Top left",
                Language: "English",
                Color_space: "ITU-R BT.709 Range",
                Buffer_dimensions: "1920x1088",
                Color_primaries: "ITU-R BT.709",
                Type: "Video",
              },
              "Stream 1": {
                Codec: "MPEG AAC Audio (mp4a)",
                Channels: "Stereo",
                Type: "Audio",
                Bits_per_sample: "32",
                Language: "English",
                Sample_rate: "48000 Hz",
              },
              meta: { filename: "05 Tis so Sweet test.mp4" },
            },
            titles: [],
          },
          repeat: true,
          subtitledelay: 0,
          equalizer: [],
        },
      },
    };
  },
  async created() {
    this.status = await statusService.get();
  },
  methods: {
    sendCommand: statusService.sendCommand,
    sendRequest: statusService.sendRequest,
    secToTime,
  },
};
</script>
