<template>
  <v-app>
    <v-toolbar app dark color="deep-orange darken-4">
      <v-toolbar-title class="headline text-uppercase">
        <span>IQDashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
        <v-container
            fluid
        >
                <v-fade-transition mode="out-in">
                    <router-view/>
                </v-fade-transition>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
