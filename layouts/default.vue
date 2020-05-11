<template>
  <v-app>
    <v-navigation-drawer
      :clipped="app.clipped"
      v-model="app.drawer"
      fixed
      app>
      <v-subheader>Menu</v-subheader>
      <v-list>
        <v-list-item
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in menuItems"
          exact
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-subheader>Options</v-subheader>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="autoRefresh"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="`Auto Refresh: ${autoRefresh ? 'On' : 'Off'}`"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-subheader>Sponsors</v-subheader>
      <div class="sponsors-wrapper">
        <!-- <img
          src="~/assets/images/sponsors_openface.svg"
          width="100%"
          alt="OpenFace"> -->
      </div>
    </v-navigation-drawer>

    <v-app-bar
       app
       clipped-left
     >
      <v-app-bar-nav-icon @click.stop="toggle('drawer')"></v-app-bar-nav-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        v-bind="{ [`grid-list-xl`]: true }"
        :fill-height="fillHeight">
        <nuxt />
      </v-container>
    </v-content>
    <v-dialog
      v-model="fireworksDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable>
      <Fireworks/>
    </v-dialog>
  </v-app>
</template>

<script>
  import { mapGetters, mapState, mapMutations } from 'vuex';
  import Fireworks from '~/components/Fireworks';

  export default {
    async created () {
      await this.$store.dispatch('LOAD_STATUS');
    },
    data () {
      return {
        dialog: false
      }
    },
    components: {
      Fireworks
    },
    computed: {
      title() {
        return this.$store.state.status.event_name;
      },
      ...mapGetters([
        'app',
        'menuItems',
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
      fireworksDialog: {
        get () {
          return this.$store.state.fireworksDialog;
        },
        set () {
          this.$store.commit('setFireworksDialog', true);
        }
      },
      fillHeight() {
        return this.$route.name === 'index';
      }
    },
    methods: {
      toggle(key) {
        this.$store.commit('toggle', key);
      }
    }
  }
</script>

<style>
.sponsors-wrapper {
  padding: 0 2rem;
  text-align: center;
}
</style>
