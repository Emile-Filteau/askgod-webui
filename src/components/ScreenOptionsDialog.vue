<template>
  <el-dialog title="Screen Options" :visible.sync="this.value">
    <el-form :model="form">
      <el-form-item label="Teams" :label-width="formLabelWidth">
        <el-select v-model="form.showTeams" placeholder="Teams">
          <el-option
            v-for="(item, key) in topTeamsOptions"
            :key="key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Start Time" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="Select date and time">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">Cancel</el-button>
      <el-button type="primary" @click="confirm()">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters([
      'screenOptions'
    ])
  },
  data () {
    return {
      form: {},
      formLabelWidth: '120px'
    }
  },
  created () {
    this.form = this.screenOptions
  },
  methods: {
    cancel () {
      // This will update visible for dialog
      this.$emit('input', false)
    },
    confirm () {
      this.$store.commit('UPDATE_SCREEN_OPTIONS', this.form)
      // This will update visible for dialog
      this.$emit('input', false)
    }
  }
}
</script>
