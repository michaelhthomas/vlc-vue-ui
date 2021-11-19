<template>
  <v-row
    align="center"
    justify="center"
  >
  <v-col
    cols="12"
    sm="8"
    md="6"
    xl="4"
  >
    <v-card class="about">
      <v-row
        align="center"
        justify="center"
      >
        <img
          height="200px"
          src="https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg"
          class="mt-4"
        />
      </v-row>
      <v-card-title>
        VLC Media Player - Material Web Interface
      </v-card-title>
      <v-card-subtitle>
        Version
      </v-card-subtitle>
      <v-card-text>
        <h4>Contributors</h4>
        Michael Thomas
      </v-card-text>
      <v-card-actions>
        <v-btn href="//github.com/michaelhthomas/vlc-vue-ui">View source</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Settings',
}
</script>