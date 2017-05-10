<template>
  <a
    v-bind:href="href"
    v-bind:class="{ active: isActive }"
    v-on:click="go"
  >
    <slot></slot>
  </a>
</template>

<script>
  import { routeByPath } from '../routes'
  export default {
    props: {
      href: String,
      required: true
    },
    computed: {
      isActive () {
        let route = this.$store.state.app.currentRoute || {}
        return this.href === route.path
      }
    },
    methods: {
      go (event, href) {
        event.preventDefault()
        let path = event.target.href.replace(window.location.origin, '')
        let newRoute = routeByPath(path)
        this.$store.dispatch('updateCurrentRoute', newRoute)
      }
    }
  }
</script>
