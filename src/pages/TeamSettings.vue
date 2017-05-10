<template>
  <main-layout>
    <el-row :gutter="24">
      <el-col :md="{span: 12, offset: 6}">
        <el-form
          :model="teamForm"
          :rules="rules"
          :label-position="'left'"
          ref="teamForm"
          label-width="80px">
          <h1>{{title}}</h1>
          <el-form-item label="Name" prop="name">
            <el-input
              :disabled="settings.team_self_register"
              v-model="teamForm.name"
              placeholder="My super duper team name">
            </el-input>
          </el-form-item>
          <el-form-item label="Website" prop="website">
            <el-input
              :disabled="settings.team_self_register"
              v-model="teamForm.website"
              placeholder="https://www.nsec.io">
            </el-input>
          </el-form-item>
          <el-form-item label="Country" prop="country">
            <el-select
              filterable
              :disabled="settings.team_self_register"
              v-model="teamForm.country"
              placeholder="Select your country">
              <el-option
                v-for="item in countries"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit('teamForm')"
              :disabled="settings.board_read_only">Update</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </main-layout>
</template>
<style>
h1 {
  margin-top: 0;
}
.el-select {
  width: 100%;
}
</style>
<script>
import emojiFlags from 'emoji-flags'

export default {
  name: 'team-settings',
  data () {
    return {
      title: 'Team Settings',
      rules: {
        name: [
          { required: true, message: 'Team name is required', trigger: 'blur' }
        ],
        website: [
          { type: 'url', message: 'Website must be a valid URL', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    teamForm: {
      get () {
        return this.$store.state.myTeam
      }
    },
    settings () {
      return this.$store.state.settings
    },
    countries () {
      return emojiFlags.data.map(c => ({
        value: c.code,
        label: c.name
      }))
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('updateTeam', this.teamForm).then((response) => {
            if (response.ok) {
              this.$message({
                message: 'Your team settings have beend updated',
                type: 'success'
              })
            } else {
              this.$message({
                message: 'Server Error. Try again later!',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: 'Please make sure all fields are valid.',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>
