<template type="text/html">
  <div id="app">
    <el-row :gutter="24">
      <el-col :span="24"><team-list></team-list></el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import Hello from './components/Hello'
import TeamList from './components/TeamList'
import { Table } from 'element-ui'

Vue.component(Table.name, Table)
export default {
  name: 'app',
  components: {
    Hello,
    TeamList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
