<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="No valid flags submitted"
          :default-sort="{prop: 'id', order: 'descending'}"
          :data="teamFlags">
          <el-table-column type="expand">
            <template scope="props">
              <TextEditor v-model="props.row.notes"></TextEditor>
              <el-button type="primary"
                         class="update-notes-btn"
                         @click="onSubmit(props.row)">
                         Update Team Notes
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="submit_time"
            label="Date"
            sortable>
            <template scope="props">
              {{ dateFromNowLTS(props.row.submit_time) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="Description">
          </el-table-column>
          <el-table-column
            prop="return_string"
            label="Help">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            sortable
            width="100">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </main-layout>
</template>

<style>
.update-notes-btn {
  margin-top: 8px;
}
</style>

<script>
import TextEditor from '../components/TextEditor'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'team-flags',
  components: {
    TextEditor
  },
  data () {
    return {
      title: 'Team Flags',
      form: {
        notes: ''
      }
    }
  },
  computed: {
    ...mapState([
      'teamFlags'
    ]),
    ...mapGetters([
      'dateFromNowLTS'
    ])
  },
  methods: {
    onSubmit (flag) {
      this.$store.dispatch('updateFlagNote', flag).then(response => {
        if (response.ok) {
          this.$message({
            message: `Flag #${flag.id} notes updated.`,
            type: 'success'
          })
        } else {
          response.text().then(message => {
            const MAX_CHARS = 1000
            this.$message({
              message: message.trim() + `. Limited to ${MAX_CHARS} chars.`,
              type: 'error'
            })
          })
        }
      })
    }
  }
}
</script>
