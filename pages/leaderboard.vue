<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="$store.state.teams"
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
  </v-layout>
</template>

<script>
import axios from 'axios'

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
  async fetch ({ store, params }) {
    if (store.state.teams.length === 0) {
      await store.dispatch('LOAD_TEAMS')
    }
  }
}
</script>
