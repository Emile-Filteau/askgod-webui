<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Team</v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-text-field
                v-model="name"
                :counter="25"
                :rules="nameRules"
                label="Name"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="website"
                :rules="websiteRules"
                label="Website"
                outlined
              ></v-text-field>

              <v-autocomplete
               :items="countries"
               item-text="text"
               label="Country"
               v-model="country"
               required
               outlined
              ></v-autocomplete>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Status</v-card-title>
          <v-list subheader>
            <v-subheader>Permissions</v-subheader>
            <v-list-item
              v-for="p in permissions"
              :key="p.key">
              <v-list-item-action>
                <v-checkbox
                  v-model="$store.state.status[p.key]"
                  :disabled="true"/>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ p.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-subheader>Flags</v-subheader>
            <v-list-item
              v-for="f in flags"
              :key="f.key">
              <v-list-item-action>
                <v-checkbox
                  v-model="$store.state.status.flags[f.key]"
                  :disabled="true"/>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ f.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      :timeout="timeout"
      :color="color"
      bottom
      left
      v-model="snackbar">
      {{ text }}
      <v-btn
        text
        @click.native="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import COUNTRY_CODES from '../assets/country-codes.json'
import { notify } from '~/components/mixins/notify'

export default {
  mixins: [notify],
  async created () {
    await this.$store.dispatch('LOAD_MY_TEAM_INFO');
  },
  data () {
    return {
      permissions: [
        {label: 'Is Admin', key: 'is_admin'},
        {label: 'Is Team', key: 'is_team'},
        {label: 'Is Guest', key: 'is_guest'},
      ],
      flags: [
        {label: 'Team Self Register', key: 'team_self_register'},
        {label: 'Team Self Update', key: 'team_self_update'},
        {label: 'Board Read Only', key: 'board_read_only'},
        {label: 'Board Hide Others', key: 'board_hide_others'},
      ],
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 50 characters',
      ],
      websiteRules: [
        v => /^(http|https):\/\/[^ "]+$/.test(v) || v === '' || ' Must be valid a valid URL',
      ],
      countries: COUNTRY_CODES.map(x => ({
        text: x.country_name,
        value: x.alpha_2,
      })),
      checkbox: false,
      lazy: false,
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.myTeam.name
      },
      set(value) {
        this.$store.commit('setTeamInfo', {
          ...this.$store.state.myTeam,
          name: value,
        })
      }
    },
    website: {
      get() {
        return this.$store.state.myTeam.website
      },
      set(value) {
        this.$store.commit('setTeamInfo', {
          ...this.$store.state.myTeam,
          website: value,
        })
      }
    },
    country: {
      get() {
        return this.$store.state.myTeam.country
      },
      set(value) {
        this.$store.commit('setTeamInfo', {
          ...this.$store.state.myTeam,
          country: value,
        })
      }
    }
  },
  methods: {
    async save () {
      if (!this.$refs.form.validate()) return;
      try {
        const { status, statusText } = await this.$store.dispatch('UPDATE_TEAM_INFO', this.$store.state.myTeam)
        status === 200 ?
          this.notify('Bravo! Team updated successfully.', 'success') :
          this.notify(statusText)
      } catch (err) {
        this.notify('Un exepected error occurred!')
      }
    }
  }
}
</script>
