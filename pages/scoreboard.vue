<template>
  <v-layout
    row
    wrap>
    <v-flex
      v-for="i in top3"
      :key="`${i.team.id}`"
      xs4>
      <v-card
        dark
        color="secondary">
        <v-card-text class="text-xs-center ellipsis">
          <span class="display-1">{{ i.team.name }}</span>
          <v-divider/>
          <span class="display-3">{{ i.score }}</span>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="$store.state.scoreboard"
          hide-actions
          class="elevation-1">
          <template
            slot="items"
            slot-scope="props">
            <td class="text-xs-center">{{ props.item.score }}</td>
            <td>{{ props.item.team.name }}</td>
            <td>{{ props.item.team.country }}</td>
            <td>{{ $moment(props.item.lastFlag).fromNow() }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        { text: 'Score', value: 'score', sortable: false, align: 'center'},
        { text: 'Name', value: 'name', sortable: false},
        { text: 'Country', value: 'country', sortable: false},
        { text: 'Last Flag', value: 'lastFlag', sortable: false},
      ]
    }
  },
  computed: {
    top3 () {
      return this.$store.state.scoreboard.slice(0, 3);
    }
  },
  async fetch ({ store, params }) {
    if (store.state.scoreboard.length === 0) {
      await store.dispatch('LOAD_SCOREBOARD')
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
