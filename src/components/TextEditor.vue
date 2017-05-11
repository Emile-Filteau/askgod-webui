<template>
    <quill-editor ref="myTextEditor"
                  v-model="internalValue"
                  @change="updateValue"
                  :options="editorOption">
    </quill-editor>
</template>

<style>
.quill-editor {
  max-width: 56rem;
}
.ql-container .ql-editor {
  background-color: #fff;
  min-height: 20em;
  padding-bottom: 1em;
  max-height: 25em;
}
</style>

<script>
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor)

export default {
  name: 'text-editor',
  props: ['value'],
  data () {
    return {
      internalValue: this.value,
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
    editor () {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  methods: {
    updateValue (quill) {
      this.$emit('input', quill.text)
    }
  }
}
</script>
