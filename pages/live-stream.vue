<template>
  <v-container fill-height>
    <v-layout>
      <iframe
        :src="liveStreamURL"
      ></iframe>
    </v-layout>
  </v-container>
</template>

<script>
const TWITCH_STREAM_URL = 'https://player.twitch.tv/?channel=northsec';
export default {
  data() {
    return {
      liveStreamURL: `${TWITCH_STREAM_URL}&parent=${window.location.href}`
    }
  }
}
</script>

<style scope>
iframe {
  display: block;
  border: none;
  height: auto;
  width: 100%;
}
</style>
