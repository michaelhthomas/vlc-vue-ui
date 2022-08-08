import { defineStore } from "pinia";
import statusService from "@/services/status";
import secToTime from "@/utils/sec-to-time";

type State = "playing" | "paused" | "stopped";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStatus = defineStore("status", {
  poll: {
    enabled: true,
    interval: 500,
    function: "updateStatus",
  },
  state: () => {
    return {
      connected: false,
      error: undefined as string | undefined,
      state: undefined as State | undefined,
      filename: undefined as string | undefined,
      fullscreen: false,
      time: 0,
      length: 0,
      position: 0,
      volume: 0,
      repeat: false,
      random: false,
    };
  },
  getters: {
    timeFormat: (state) => secToTime(state.time),
    lengthFormat: (state) => secToTime(state.length),
  },
  actions: {
    async updateStatus() {
      try {
        const newStatus = await (await statusService.getOnce()).data;
        this.$patch({
          connected: true,
          state: newStatus.state,
          filename:
            newStatus.information?.category?.meta?.filename ?? undefined,
          fullscreen: !!newStatus.fullscreen,
          time: newStatus.time,
          length: newStatus.length,
          position: newStatus.position,
          volume: newStatus.volume,
          repeat: newStatus.repeat,
          random: newStatus.random,
        });
      } catch (err: any) {
        this.connected = false;
        this.error = err.message;
      }
    },
    async playPause() {
      if (this.state == "paused") this.state = "playing";
      else if (this.state == "playing") this.state = "paused";

      await statusService.sendCommand("pl_pause");
    },
    async stop() {
      await statusService.sendCommand("pl_stop");
    },
    async prev() {
      await statusService.sendCommand("pl_previous");
    },
    async next() {
      await statusService.sendCommand("pl_next");
    },
    async toggleFullscreen() {
      await statusService.sendCommand("fullscreen");
    },
    async seek(val: number) {
      await statusService.sendRequest({
        command: "seek",
        val,
      });
    },
  },
});
