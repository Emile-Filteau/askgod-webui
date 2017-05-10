<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="Loading..."
          :data="scoreboard">
          <el-table-column
            type="index"
            label="Rank"
            width="75">
          </el-table-column>
          <el-table-column
            prop="team.name"
            label="Name">
            <template scope="props">
              <a v-if="props.row.team.website"
                v-bind:href="props.row.team.website"
                target="_blank">{{props.row.team.name}}
              </a>
              <span v-else>{{props.row.team.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="team.country"
            label="Country">
            <template scope="props">
              {{ getFlagAndCountryName(props.row.team.country) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="team.country"
            label="Last Flag">
            <template scope="props">
              <span v-if="isValidDate(props.row.last_submit_time)">
                {{ formatDate(props.row.last_submit_time) }}
              </span>
              <em v-else>N/A</em>
            </template>
          </el-table-column>
          <el-table-column
            label="Score"
            width="100">
            <template scope="props">
              {{ props.row.value }}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </main-layout>
</template>

<script>
import moment from 'moment-es6'
import emojiFlags from 'emoji-flags'

export default {
  name: 'leaderboard',
  data () {
    return {
      title: 'Leaderboard'
    }
  },
  computed: {
    scoreboard () {
      return this.$store.state.scoreboard
    }
  },
  methods: {
    formatDate: function (date) {
      return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
    },
    isValidDate: function (date) {
      return date !== '0001-01-01T00:00:00Z'
    },
    getFlagAndCountryName (code) {
      let country = emojiFlags.countryCode(code)
      if (country) {
        return country.emoji + ' ' + country.name
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
