<template>
  <v-container>
    <v-flex>
      <timeline
        class="timeline"
        :chart-data="timelineChartData"
        :options="timelineChartOptions"/>
    </v-flex>
  </v-container>
</template>


<script>
import Timeline from '~/components/Timeline.vue';
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    Timeline
  },
  data () {
    return {
      refresher: null,
    }
  },
  created () {
    if (this.autoRefresh) {
      this.startRefresher();
    }
  },
  computed: {
    ...mapState([
      'timelineChartOptions',
    ]),
    ...mapGetters([
      'timelineChartData',
      'autoRefresh'
    ]),
  },
  watch: {
    autoRefresh (newVal, oldVal) {
      newVal ? this.startRefresher() : this.stopRefresher();
    }
  },
  methods: {
    startRefresher () {
      this.refresher = setInterval(() => {
        this.$store.dispatch('LOAD_TIMELINE');
      }, 30000);
      console.log('Timeline refresher started');
    },
    stopRefresher () {
      clearInterval(this.refresher);
      console.log('Timeline refresher stopped');
    }
  },
  async fetch ({ store }) {
    try {
      await store.dispatch('LOAD_TIMELINE');
    } catch (e) {
      console.log(e)
    }
  }
}
</script>


<style scoped>
.timeline {
  height: 100%;
  position: relative;
}
</style>
