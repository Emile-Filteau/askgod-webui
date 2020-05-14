<template>
  <v-layout row>
    <v-flex
      xs12
      sm6
      offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Submit a new flag</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit">
            <v-text-field
              autofocus
              v-model="flag"
              :rules="[v => !!v || 'Flag is required']"
              label="Flag"
              required/>
            <v-btn
              :disabled="disableForm"
              @click="submit">
              Submit
            </v-btn>
          </v-form>
        </v-card-text>
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
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { notify } from '~/components/mixins/notify'

export default {
  mixins: [notify],
  data () {
    return {
      valid: true,
      flag: '',
    }
  },
  computed: {
    disableForm () {
      return !this.valid;
    }
  },
  methods: {
    async submit () {
      if (!this.$refs.form.validate()) return;
      try {
        let { ok, text } = await this.$store.dispatch('SUBMIT_FLAG', this.flag);
        if (ok) {
          this.notify('Bravo! The flag is valid.', 'success')
        } else if (text) {
          text().then(message => this.notify(message))
        } else {
          console.error('Unhandled client error')
        }
      } catch (error) {
        this.notify('Un exepected error occurred!')
      }
    }
  }
}
</script>
