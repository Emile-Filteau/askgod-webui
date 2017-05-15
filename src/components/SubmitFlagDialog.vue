<template type="text/html">
  <el-tooltip :disabled="!settings.board_read_only" class="item" effect="dark" content="You cannot submit flag at this time" placement="bottom">
    <el-button type="primary" @click="submitFlag" :disabled="settings.board_read_only">Submit Flag</el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'submit-flag-dialog',
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    submitFlag () {
      this.$prompt('Enter your flag', 'Flag submission', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$store
              .dispatch('submitFlag', instance.inputValue)
              .then(response => {
                response.ok ? done() : response.text().then(message => {
                  this.$message({
                    type: 'error',
                    message: message
                  })
                })
              })
          } else {
            done()
          }
        }
      })
    }
  }
}
</script>
