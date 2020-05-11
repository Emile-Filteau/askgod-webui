<template>
  <v-layout row>
    <v-flex
      xs12
      sm6
      offset-sm3>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>Status</v-toolbar-title>
        </v-toolbar>
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
      ]
    }
  }
}
</script>
