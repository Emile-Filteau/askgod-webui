<template>
  <v-app>
    <v-navigation-drawer
      :clipped="app.clipped"
      v-model="app.drawer"
      fixed
      app>
      <NorthSecLogo class="nsec-logo" />
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-subheader>Screen Options</v-subheader>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="theme"
              hide-details
              inset
            />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dark Theme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-switch
              v-model="autoRefresh"
              hide-details
              inset>
              ></v-switch>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Auto Refresh</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- <v-subheader>Sponsors</v-subheader>
      <div class="sponsors-wrapper">
        <img
          src="~/assets/images/sponsors_openface.svg"
          width="100%"
          alt="OpenFace">
      </div> -->
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer('drawer')"/>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
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
  import { mapGetters } from 'vuex'
  import Fireworks from '~/components/Fireworks'
  import NorthSecLogo from '~/components/NorthSecLogo'

  export default {
    async created () {
      await this.$store.dispatch('LOAD_STATUS');
    },
    data: vm => ({
      dialog: false,
    }),
    components: {
      Fireworks,
      NorthSecLogo
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
      theme: {
        get () {
          this.$vuetify.theme.dark = this.$store.state.settings.theme;
          return this.$vuetify.theme.dark;
        },
        set (value) {
          this.$vuetify.theme.dark = value
          this.$store.commit('updateSettings', {
            key: 'theme',
            value: value,
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
      toggleDrawer(key) {
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
.nsec-logo {
  padding: 1rem;
  max-width: 50%;
}
</style>
