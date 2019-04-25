<template>
  <v-app>
    <v-toolbar app dark color="deep-orange darken-4">
      <v-toolbar-title class="headline text-uppercase">
        <span>IQDashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      {{usuario.email}}
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

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data () {
    return { 
       // usuario: {}
    }
  },
    created() {
        this.syncUsuarioAction()
    },
    computed: {
        ...mapGetters({
            getUsuario: 'usuario/usuarioGetter',
        }),
        usuario(){
            return this.getUsuario && Object.keys(this.getUsuario).length > 0 ? this.getUsuario : {};
        }
    },
    methods:{
        ...mapActions({
            syncUsuarioAction: 'usuario/syncUsuarioAction',
        }),
    },
    // watch:{
    //     getUsuario(){
    //         this.usuario = Object.keys(this.getUsuario).lenth > 0 ? this.getUsuario : {};
    //     }
    // }
}
</script>
