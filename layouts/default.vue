<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      fixed
      v-model="drawer"
      >
      <v-subheader>{{ eventName }}</v-subheader>
      <v-list>
        <v-list-item
          router
          to="/readme"
          exact
        >
          <v-list-item-action>
            <v-icon>local_library</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Readme</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          to="/"
          exact
        >
          <v-list-item-action>
            <v-icon>bar_chart</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Timeline</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          to="/scoreboard"
          exact
        >
          <v-list-item-action>
            <v-icon>view_list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Scoreboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          href="https://severityhigh.nsec/login"
          exact
        >
          <v-list-item-action>
            <v-icon>sports_esports</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Challenges</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          to="/submit-flag"
          exact
        >
          <v-list-item-action>
            <v-icon>flag</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Submit Flag</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          to="/live-stream"
          exact
        >
          <v-list-item-action>
            <v-icon>live_tv</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Twitch Stream</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          to="/settings"
          exact
        >
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
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
          <v-list-item>
            <v-list-item-action>
              <v-switch
                v-model="animation"
                hide-details
                inset>
                ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Animation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <NorthSecLogo class="nsec-logo" />
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
    <v-dialog
      v-model="animation"
      fullscreen
      transition="dialog-bottom-transition"
      >
      <v-card>
        <v-toolbar :flat="true">
          <v-btn
            icon
            @click="closeDialog">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title v-if="!showLatestScore">Waiting score updates...</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear
          v-if="!showLatestScore"
          indeterminate
        ></v-progress-linear>
        <Fireworks v-if="animation"/>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-if="!animation"
      :timeout="5000"
      color="success"
      multi-line
      top
      right
      v-model="showLatestScore">
      {{latestScore.team.name}} <strong>+{{latestScore.score}} POINTS</strong>
      <v-btn
        fab
        x-small
        outlined
        @click.native="showLatestScore = false">
        <v-icon dark>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Fireworks from '~/components/Fireworks'
  import NorthSecLogo from '~/components/NorthSecLogo'

  export default {
    async created () {
      const {query} = this.$router.currentRoute
      this.$store.dispatch('LOAD_STATE_FROM_URL', query)
      await this.$store.dispatch('LOAD_STATUS')
    },
    data: vm => ({
      dialog: false,
      drawer: null,
      showLatestScore: false,
    }),
    components: {
      Fireworks,
      NorthSecLogo
    },
    watch: {
      latestScore(newVal, oldVal) {
        this.showLatestScore = true
        // Hide team score after 5 seconds
        setTimeout(() => this.showLatestScore = false, 5000)
      }
    },
    methods: {
      closeDialog () {
        this.$store.commit('showOverlayAnimation', false);
      }
    },
    computed: {
      eventName() {
        return this.$store.state.status.event_name;
      },
      ...mapGetters([
        'app',
        'latestScore',
      ]),
      autoRefresh: {
        get() {
          return this.$store.state.settings.autoRefresh;
        },
        set(value) {
          this.$store.commit('updateSettings', {
            key: 'autoRefresh',
            value: value,
          });
        }
      },
      theme: {
        get() {
          this.$vuetify.theme.dark = this.$store.state.settings.theme;
          return this.$vuetify.theme.dark;
        },
        set(value) {
          this.$vuetify.theme.dark = value
          this.$store.commit('updateSettings', {
            key: 'theme',
            value: value,
          });
        }
      },
      animation: {
        get() {
          return this.$store.state.settings.animationEnabled
        },
        set(value) {
          this.$store.commit('updateSettings', {
            key: 'animationEnabled',
            value: value,
          });
        }
      }
    }
  }
</script>

<style>
.notification--score {
  maring-left: 1rem;
}
.sponsors-wrapper {
  padding: 0 2rem;
  text-align: center;
}
.nsec-logo {
  padding: 1rem;
  vertical-align: middle;
  height: 64px !important;
  width: auto !important;
}
</style>
