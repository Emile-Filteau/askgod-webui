<template>
  <div class="teamList">
    <h1>Team List</h1>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="rank"
        label="Rank"
        width="100"
        st>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="score"
        label="Score"
        width="100">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { Table } from 'element-ui'

Vue.component(Table.name, Table)

export default {
  name: 'teamList',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableData: [{
        rank: 1,
        name: 'Keven with special chars',
        score: 200
      }, {
        rank: 2,
        name: 'Melissa',
        score: 150
      }, {
        rank: 3,
        name: 'Ze team',
        score: 100
      }, {
        rank: 4,
        name: 'Dude where is my car?@!#$',
        score: 0
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
