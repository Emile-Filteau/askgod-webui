<template>
  <v-app dark>
    <v-navigation-drawer
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
      <v-divider/>
      <div class="sponsors-wrapper">
        <img
          src="~/assets/images/sponsors_openface.svg"
          width="100%"
          alt="OpenFace">
      </div>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :clipped-left="app.clipped">
      <v-toolbar-side-icon @click="toggle('drawer')"/>
      <v-toolbar-title v-text="title"/>
    </v-toolbar>
    <v-content>
      <v-container
        v-bind="{ [`grid-list-xl`]: true }"
        :fill-height="fillHeight">
        <nuxt />
      </v-container>
    </v-content>
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
      ...mapGetters([
        'app',
      ]),
      autoRefresh: {
        get () {
          return this.$store.state.settings.autoRefresh;
        },
        set (value) {
          this.$store.commit('updateSettings', {
            key: 'autoRefresh',
            value: !value,
          });
        }
      },
      fillHeight() {
        return this.$route.name === 'index';
      }
    },
    methods: {
      toggle(key) {
        this.$store.commit('toggle', key);
      },
    }
  }
</script>

<style>
.sponsors-wrapper {
  padding: 0 2rem;
  text-align: center;
}
</style>
