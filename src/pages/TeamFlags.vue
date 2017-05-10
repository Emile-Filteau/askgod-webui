<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="No valid flags submitted"
          :default-sort="{prop: 'id', order: 'descending'}"
          :data="flags">
          <el-table-column type="expand">
            <template scope="props">
                <quill-editor ref="myTextEditor"
                              v-model="props.row.notes"
                              :options="editorOption">
                </quill-editor>
                <el-button type="primary"
                           class="update-notes-btn"
                           @click="onSubmit('addFlagNote', props.row)">Update Team Notes</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            label="Date"
            sortable>
            <template scope="props">
              {{ formatDate(props.row.submit_time) }}
            </template>
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
.ql-container .ql-editor {
  background-color: #fff;
  min-height: 20em;
  padding-bottom: 1em;
  max-height: 25em;
}
.update-notes-btn {
  margin-top: 8px;
}
</style>
<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import moment from 'moment-es6'

// XXX Notes should be real time edited to prevent user to override teammate notes.

Vue.use(VueQuillEditor)

export default {
  name: 'team-flags',
  data () {
    return {
      title: 'Team Flags',
      form: {
        notes: ''
      },
      editorOption: {
        modules: {
          toolbar: [
            [{'size': ['small', false, 'large']}],
            ['bold', 'italic'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      }
    }
  },
  computed: {
    flags () {
      return this.$store.state.teamFlags.slice(0, 200)
    },
    teams () {
      return this.$store.state.adminTeams
    },
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  methods: {
    onSubmit (formName, flag) {
      this.$store.dispatch('updateFlagNote', flag).then(response => {
        if (response.ok) {
          this.$message({
            message: `Flag #${flag.id} notes updated.`,
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Server Error. Try again later!',
            type: 'error'
          })
        }
      })
    },
    formatDate (date) {
      return `${moment(date).fromNow()} @ ${moment(date).format('LTS')}`
    }
  }
}
</script>
