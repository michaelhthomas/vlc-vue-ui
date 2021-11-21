<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="10"
    >
      <v-sheet class="vlmcommand pa-8">
        <h1 class="mb-4">
          Send VLM Commands
        </h1>
        <v-alert
          outlined
        >
          <div class="text-h6">
            About VLM
          </div>
          <div>
            <b>VideoLAN Manager</b> (VLM) is a small media manager designed to control multiple streams with <em>only one instance of VLC</em>. It allows multiple streaming and video on demand (VoD).
            <a href="https://wiki.videolan.org/Documentation:Streaming_HowTo/VLM/">Learn More</a>
          </div>
        </v-alert>
        <v-form ref="form">
          <v-textarea
            name="commands"
            auto-grow
            autofocus
            outlined
            label="VLM Batch Commands"
            :value="decodeURIComponent('#paste your VLM commands here\n#separate commands with a new line or a semi-colon:\n\n')"
          ></v-textarea>
          <v-btn
            color="primary"
            @click="submit"
          >
            Submit
          </v-btn>
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import quickFetch from '@/utils/quick-fetch'
const server = window.location.origin;
const VLMEndpoint = `${server}/requests/vlm_cmd.xml`

export default {
  name: 'VLMCommands',
  methods: {
    submit () {
      const commands = this.$refs.form.commands.split("\n");
      for (let command of commands) {
        command = command.trim();
        if (command.length > 0 && command.charAt(0) !== "#") {
          quickFetch(VLMEndpoint, {
            command
          })
        }
      }
    },
  }
}
</script>