<template>
  <el-dialog title="Timeline Settings" :visible.sync="this.value">
    <el-form :model="form">
      <el-form-item label="Teams" :label-width="formLabelWidth">
        <el-select v-model="form.topTeamsFilter" placeholder="Teams">
          <el-option
            v-for="(item, key) in topTeamsOptions"
            :key="key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="confirm()">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
const TIMELINE_FITLERS = {
  teams: [
    {label: 'All', value: 'all'},
    {label: 'Top 5', value: '5'},
    {label: 'Top 10', value: '10'}
  ]
}

export default {
  name: 'screen-options-dialog',
  props: ['value'],
  computed: {
    topTeamsOptions () {
      return TIMELINE_FITLERS.teams
    },
    settings () {
      return this.$store.state.app.currentUser.timeline.settings
    }
  },
  data () {
    return {
      form: {
        topTeamsFilter: TIMELINE_FITLERS.teams[0].value
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    cancel () {
      this.$emit('input', false)
    },
    confirm () {
      this.$emit('input', false)
    }
  }
}
</script>
