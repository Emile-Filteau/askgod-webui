<template>
  <v-layout>
    <v-alert
      :value="askgodUnreachable"
      dismissible
      prominent
      color="error"
      outlined
      text
      transition="fade-transition"
    >
      <div class="title">Unable to access AskGod</div>
      <div>Please visit <a target="blank" href="https://askgod.nsec">askgod.nsec</a> and make sure it's reachable.</div>
    </v-alert>
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
  data () {
    return {
      refresher: null,
      askgodUnreachable: false,
    }
  },
  async created () {
    try {
      this.$store.dispatch('LOAD_TIMELINE');
      if (this.autoRefresh) {
        this.startRefresher();
      }
    } catch (e) {
      this.askgodUnreachable = true
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
  }
}
</script>


<style scoped>
.timeline {
  height: 100%;
  position: relative;
}
</style>
