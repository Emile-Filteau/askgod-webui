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
          v-model="snackbar">
          {{ text }}
          <v-btn
            dark
            flat
            @click.native="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      flag: '',
      snackbar: false,
      color: '',
      timeout: 6000,
      text: ''
    }
  },
  computed: {
    disableForm () {
      return !this.valid;
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        let { ok, text } = this.$store.dispatch('SUBMIT_FLAG', this.flag);

        if (ok) {
            console.log(data);
            this.text = 'Bravo! The flag is valid.';
            this.color = 'success';
            this.snackbar = true;
        } else if (text) {
          text().then(message => {
            this.text = message;
            this.color = 'error';
            this.snackbar = true;
          })
        } else {
          this.text = 'Un exepected error occurred!';
          this.color = 'error';
          this.snackbar = true;
        }
      }
    }
  }
}
</script>
