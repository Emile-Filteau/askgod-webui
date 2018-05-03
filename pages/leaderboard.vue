<template>
  <v-layout>
    <v-data-table
      :headers="headers"
      :items="teams"
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
  export default {
    computed: {
      teams () { return this.$store.state.teams }
    },
    data () {
      return {
        headers: [
          { text: 'Score', value: 'score'},
          { text: 'Name', value: 'name' },
          { text: 'Country', value: 'country' },
          { text: 'Last Flag', value: 'lastFlag' },
        ],
      }
    }
  }
</script>
