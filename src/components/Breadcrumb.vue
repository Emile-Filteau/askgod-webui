<template type="text/html">
  <el-breadcrumb separator="/" v-if="isNotHome">
    <el-breadcrumb-item>
      <VLink :href="home.path">{{home.name}}</VLink>
    </el-breadcrumb-item>
    <el-breadcrumb-item>
      <VLink :href="currentRoute.path">{{currentRoute.name}}</VLink>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style scoped>
.el-breadcrumb {
  margin-bottom: 25px;
}
.el-breadcrumb a {
  text-decoration: none
}
</style>
<script>
import { ROUTES } from '../routes'
import VLink from './VLink'
export default {
  name: 'breadcrumb',
  components: {
    VLink
  },
  computed: {
    home () {
      return ROUTES.is_guest[0]
    },
    currentRoute () {
      return this.$store.state.app.currentRoute
    },
    isNotHome () {
      return this.currentRoute.path !== this.home.path
    }
  }
}
</script>
