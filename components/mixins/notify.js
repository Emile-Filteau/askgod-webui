export const notify = {
  data() {
    return {
      snackbar: false,
      color: '',
      timeout: 6000,
      text: '',
    }
  },
  methods: {
    notify: function(message, status = 'error') {
      this.text = message;
      this.color = status;
      this.snackbar = true;
    }
  }
}
