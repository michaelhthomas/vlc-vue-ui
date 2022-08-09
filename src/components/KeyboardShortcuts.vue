<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="text-h5 pr-4">
          Keyboard Shortcuts
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template #default>
              <tbody>
                <tr v-for="(shortcut, i) in shortcuts" :key="i">
                  <td>{{ shortcut.action }}</td>
                  <td class="text-right">
                    <kbd v-for="(key, i) in shortcut.keys" :key="i">
                      {{ key }}
                    </kbd>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      shortcuts: [
        {
          keys: ["Space"],
          action: "Play/Pause",
        },
        {
          keys: ["B"],
          action: "Previous",
        },
        {
          keys: ["N"],
          action: "Next",
        },
        {
          keys: ["S"],
          action: "Stop",
        },
        {
          keys: ["F"],
          action: "Fullscreen",
        },
      ],
    };
  },
  methods: {
    open() {
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
.v-data-table__wrapper > table > tbody > tr:hover {
  background: inherit !important;
}
</style>
