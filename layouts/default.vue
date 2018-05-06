<template>
  <v-app dark>
    <v-navigation-drawer
      :mini-variant.sync="app.miniVariant"
      :clipped="app.clipped"
      v-model="app.drawer"
      fixed
      app>
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in app.items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :clipped-left="app.clipped">
      <v-toolbar-side-icon @click="toggle('drawer')"/>
      <v-btn
        icon
        @click.stop="toggle('miniVariant')"
      >
        <v-icon v-html="app.miniVariant ? 'chevron_right' : 'chevron_left'"/>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn
        icon
        @click.stop="toggle('rightDrawer')"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fill-height="true">
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="app.right"
      v-model="app.rightDrawer"
      fixed>
      <p>nothing here for now!</p>
    </v-navigation-drawer>
    <v-footer
      :fixed="app.fixed"
      app>
      <span>NorthSec &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex';

  export default {
    async created () {
      await this.$store.dispatch('LOAD_STATUS');
    },
    computed: {
      title() {
        return this.$store.state.status.event_name;
      },
      ...mapGetters(['app']),
    },
    methods: {
      toggle(key) {
        this.$store.commit('toggle', key);
      }
    }
  }
</script>
