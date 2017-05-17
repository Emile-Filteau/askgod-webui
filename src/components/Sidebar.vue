<template>
  <el-menu :default-active="activePageIndex"
    class="el-menu-vertical">
    <el-menu-item-group title="Public">
      <el-menu-item
        v-for="route in routes.is_guest"
        :key="route.path"
        :index="route.index.toString()"
        @click="go(route)">{{route.name}}</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Team" class="team" v-if="settings.is_team">
      <el-menu-item
        v-for="route in routes.is_team"
        :key="route.path"
        :index="route.index.toString()"
        @click="go(route)">{{route.name}}</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Admin" class="admin" v-if="settings.is_admin">
      <el-menu-item
        v-for="route in routes.is_admin"
        :key="route.path"
        :index="route.index.toString()"
        @click="go(route)">{{route.name}}</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Sponsors" class="sponsors">
      <div>
        <span><img src="../assets/sponsors_ovh.svg" width="100%" alt="OVH" /></span>
        <span><img src="../assets/sponsors_shopify.svg" width="100%" alt="Shopify" /></span>
        <span><img src="../assets/sponsors_openface.svg" width="100%" alt="OpenFace" /></span>
      </div>
    </el-menu-item-group>
  </el-menu>
</template>
<style scoped>
.el-menu {
  background-color: #f2f2f2;
}
.el-menu-vertical {
  height: 100%;
  overflow: scroll;
}
.sponsors {}
.sponsors div {
  padding: 16px 16px;
}
.sponsors div span {
  margin-bottom: 1rem;
}
</style>
<script>
import { ROUTES } from '../routes'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'sidebar',
  computed: {
    routes () {
      return ROUTES
    },
    ...mapState([
      'settings'
    ]),
    ...mapGetters([
      'activePageIndex'
    ])
  },
  methods: {
    go (newRoute) {
      this.$store.dispatch('updateCurrentRoute', newRoute)
    }
  }
}
</script>
