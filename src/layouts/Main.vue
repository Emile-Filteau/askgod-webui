<template type="text/html">
  <div class="wrapper">
    <header>
      <VLink href="/scoreboard/"><img src="../assets/nsec_logo-white.svg" class="nsec-logo" alt="NorthSec" /></VLink>
      <ul class="header-operations">
        <li v-if="settings.is_team">
          <SubmitFlagDialog></SubmitFlagDialog>
        </li>
        <li>
          <el-button type="primary" @click="dialogVisible = true">Screen options</el-button>
        </li>
      </ul>
    </header>
    <el-row class="container">
      <el-col class="menu" :xs="4" :span="3" >
        <sidebar></sidebar>
      </el-col>
      <el-col class="content" :xs="20" :span="21">
        <Breadcrumb></Breadcrumb>
        <slot></slot>
      </el-col>
    </el-row>
    <ScreenOptionsDialog v-model="dialogVisible"></ScreenOptionsDialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb'
import Sidebar from '../components/Sidebar'
import SubmitFlagDialog from '../components/SubmitFlagDialog'
import ScreenOptionsDialog from '../components/ScreenOptionsDialog'
import VLink from '../components/VLink'

export default {
  name: 'main-layout',
  components: {
    Breadcrumb,
    Sidebar,
    SubmitFlagDialog,
    ScreenOptionsDialog,
    VLink
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  }
}
</script>

<style>
html, body, .wrapper, .container, .menu, .content {
  height: 100%;
}
body {
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.text-centered {
  text-align: center;
}
.wrapper {
  position: relative;
  height: 100%;
}
.container {
  padding-top: 60px;
}
header {
  height: 60px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0 20px;
  z-index: 1;
  box-sizing: border-box;
  background-color: #1c75bc;
}
.nsec-logo {
  display: inline-block;
  vertical-align: middle;
  height: 40px;
  padding: 10px 0;
}
.header-operations {
  display: inline-block;
  float: right;
  height: 100%;
  margin: 0;
}
.header-operations li {
  color: #fff;
  display: inline-block;
  vertical-align: middle;
  line-height: 60px;
  cursor: pointer;
}
.content {
  padding: 25px;
  overflow-y: auto;
}
</style>
