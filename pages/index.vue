<template>
  <v-layout>
    <v-flex>
      <v-card>
        <timeline
          :chart-data="timelineChartData"
          :options="timelineChartOptions"/>
      </v-card>
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
