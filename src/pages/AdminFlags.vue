<template>
  <main-layout>
    <el-row>
      <el-col>
        <el-table
          empty-text="Loading..."
          :default-sort="{prop: 'id', order: 'ascending'}"
          :data="flags">
          <el-table-column
            prop="id"
            label="ID"
            sortable
            width="75">
            <template scope="props">
              <el-tooltip
              class="item"
              effect="light"
              :content="props.row.flag"
              placement="bottom">
                <span>{{ props.row.id }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="Description">
            <template scope="props">
              <el-tooltip
                v-if=""
                class="item"
                effect="light"
                :content="props.row.return_string"
                placement="bottom"
                :disabled="!props.row.return_string">
                <span>{{ props.row.description }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            label="Author"
            prop="tags.author"
            filter-placement="bottom-end"
            :filters="getFilters('author')"
            :filter-method="filterTag">
            <template scope="props">
              <el-tag
                type="primary"
                :hit="true"
                close-transition>{{formatTag(props.row.tags.author)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="LXC"
            prop="tags.lxc">
            <template scope="props">
              <el-tag
                v-if="props.row.tags.lxc"
                type="warning"
                :hit="true"
                close-transition>{{formatTag(props.row.tags.lxc)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="Origin"
            prop="tags.origin">
            <template scope="props">
              <el-tag
                v-if="props.row.tags.origin"
                type="danger"
                :hit="true"
                close-transition>{{formatTag(props.row.tags.origin)}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </main-layout>
</template>

<style scoped>
.el-tag:not(:last-child) {
  margin-right: 8px;
}
</style>

<script>
import * as actions from '../store/action-types'

export default {
  name: 'admin-flags',
  data () {
    return {
      query: {
        limitTo: 25
      }
    }
  },
  created () {
    this.$store.dispatch(actions.SET_ADMIN_FLAGS)
  },
  computed: {
    flags () {
      return this.$store.state.flags.slice(0, this.query.limitTo)
    }
  },
  methods: {
    formatTag (tag) {
      return tag ? tag.split(':').pop() : tag
    },
    filterTag (value, row) {
      return Object.values(row.tags).includes(`author:${value}`)
    },
    getFilters (key) {
      let values = this.flags.map(f => this.formatTag(f.tags[key]))
      return [...new Set(values)].map(v => ({
        text: v,
        value: v
      }))
    }
  }
}
</script>
