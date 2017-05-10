<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="Loading..."
          :default-sort="{prop: 'submit_time', order: 'descending'}"
          :data="scores">
          <el-table-column
            prop="id"
            label="ID"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            prop="team_id"
            label="Team"
            sortable>
            <template scope="props">
              {{ getTeamName(props.row.team_id) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="submit_time"
            label="Date"
            sortable>
            <template scope="props">
              {{ formatDate(props.row.submit_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="notes"
            label="Notes">
          </el-table-column>
          <el-table-column
            prop="flag_id"
            label="Flag"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            sortable
            width="120">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </main-layout>
</template>

<script>
import moment from 'moment-es6'

export default {
  name: 'admin-scores',
  created () {
    this.$store.dispatch('getScores')
  },
  computed: {
    scores () {
      return this.$store.state.adminScores
    },
    teams () {
      return this.$store.state.adminTeams
    }
  },
  methods: {
    formatDate (date) {
      return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
    },
    getTeamFilters () {
      return this.teams.map(v => ({
        text: v.name,
        value: v.id
      }))
    },
    filterTeam (row, value) {
      return row.team_id === value
    },
    getTeamName (teamId) {
      let index = this.teams.findIndex(t => t.id === teamId)
      return this.teams[index].name
    }
  }
}
</script>
