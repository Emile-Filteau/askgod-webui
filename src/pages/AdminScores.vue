<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="Loading..."
          :default-sort="{prop: 'submit_time', order: 'descending'}"
          :data="adminScores">
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
import { mapState } from 'vuex'

export default {
  name: 'admin-scores',
  created () {
    this.$store.dispatch('getScores')
  },
  computed: {
    ...mapState([
      'adminScores',
      'adminTeams'
    ])
  },
  methods: {
    formatDate (date) {
      return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
    },
    getTeamFilters () {
      return this.adminTeams.map(v => ({
        text: v.name,
        value: v.id
      }))
    },
    filterTeam (row, value) {
      return row.team_id === value
    },
    getTeamName (teamId) {
      let index = this.adminTeams.findIndex(t => t.id === teamId)
      return this.adminTeams[index].name
    }
  }
}
</script>
