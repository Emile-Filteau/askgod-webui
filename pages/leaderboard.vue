<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="$store.state.teams"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props">
        <td>{{ props.item.score }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.country }}</td>
        <td class="text-xs-right">{{ props.item.lastFlag }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      headers: [
        { text: 'Score', value: 'score'},
        { text: 'Name', value: 'name' },
        { text: 'Country', value: 'country' },
        { text: 'Last Flag', value: 'lastFlag' },
      ],
    }
  },
  // computed: {
  //   teams() {
  //     return this.;
  //   }
  // },
  async fetch ({ store, params }) {
    let url = 'http://localhost:3000/api/1.0/scoreboard/index.json';
    let { data } = await axios.get(url)
    store.commit('setTeams', data)
  }
}
</script>
