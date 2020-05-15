<template>
  <v-container fill-height>
    <v-layout>
      <Fireworks />
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Fireworks from '~/components/Fireworks'

export default {
  layout: 'empty',
  components: {
    Fireworks,
  },
  data() {
    return {
      animation: true,
    }
  },
  watch: {
    latestScore(newVal, oldVal) {
      this.showLatestScore = true
      // Hide team score after 5 seconds
      setTimeout(() => this.showLatestScore = false, 5000)
    }
  },
  computed: {
    ...mapGetters([
      'latestScore',
    ]),
  }
}
</script>
