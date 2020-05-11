<template>
  <div>
    <v-row>
      <v-col 
        lg="4" 
        cols="sm"
        v-for="i in top3"
        :key="`${i.id}`"
      >
        <v-card>
          <v-row class="no-gutters">
            <div class="col-auto">
              <div class="success fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-4 success--text">
              <h5 class="text-truncate text-uppercase">{{ i.name }}</h5>
              <h1>{{ i.score }}</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Teams
            <v-spacer/>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="scoreboard"
            :search="search"
            hide-default-footer
            class="elevation-1">
            <template v-slot:item.name="{ item }">
              <a 
                :href="item.website" 
                target="_blank" 
                rel="noopener">{{ item.name }}</a>
            </template>
            <template v-slot:item.lastFlag="{ item }">
              {{ $moment(item.lastFlag).fromNow() }}
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      headers: [
        { text: 'Rank', value: 'rank', sortable: false},
        { text: 'Name', value: 'name', sortable: false},
        { text: 'Score', value: 'score', sortable: false, align: 'center'},
        { text: 'Country', value: 'country', sortable: false},
        { text: 'Last Flag', value: 'lastFlag', sortable: false},
      ],
      refresher: null,
    }
  },
  created () {
    if (this.autoRefresh) {
      this.startRefresher()
    }
  },
  beforeDestroy() {
    this.stopRefresher();
  },
  watch: {
    autoRefresh (newVal, oldVal) {
      newVal ? this.startRefresher() : this.stopRefresher();
    }
  },
  computed: {
    ...mapGetters([
      'autoRefresh',
      'top3',
      'scoreboard',
    ]),
  },
  methods: {
    startRefresher () {
      this.refresher = setInterval(() => {
        this.$store.dispatch('LOAD_SCOREBOARD');
      }, 30000);
      console.log('Scoreboard refresher started');
    },
    stopRefresher () {
      clearInterval(this.refresher);
      console.log('Scoreboard refresher stopped');
    }
  },
  async fetch ({ store, params }) {
    if (store.state.scoreboard.length === 0) {
      try {
        await store.dispatch('LOAD_SCOREBOARD')
      } catch (e) {
        console.log(e)
      }

    }
  }
}
</script>

<style scoped>
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .divider {
    margin: 1rem 0;
  }
</style>
