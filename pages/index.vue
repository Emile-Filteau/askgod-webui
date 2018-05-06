<template>
  <v-layout>
    <v-flex>
      <timeline
        class="timeline"
        :chart-data="timelineChartData"
        :options="timelineChartOptions"/>
    </v-flex>
  </v-layout>
</template>


<script>
import Timeline from '~/components/Timeline.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    Timeline
  },
  computed: {
    ...mapState([
      'timelineChartOptions',
    ]),
    ...mapGetters([
      'timelineChartData'
    ])
  },
  async fetch ({ store }) {
    if (store.state.timeline === null) {
      await store.dispatch('LOAD_TIMELINE');
    }
  }
}
</script>


<style scoped>
.timeline {
  // 100% - footer value
  height: 90%;
  height: calc(100% - 2rem);
  position: relative;
}
</style>
