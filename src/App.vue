<template>
  <v-app>
    <v-toolbar app dark color="blue darken-4">
      <v-toolbar-title class="headline text-uppercase">
          <span>{{app}}</span>
      </v-toolbar-title>
      <v-btn to="/categoria" text small color="primary">Categoria</v-btn>
      <v-spacer></v-spacer>
      {{usuario.email}}
      <v-toolbar-items
          v-if="usuario.email"
          class="hidden-sm-and-down">
          <v-btn @click="logoff()" flat>sair</v-btn>
      </v-toolbar-items>
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
    <v-snackbar
        v-model="snackbar"
        :color="getSnackbar.color"
        :top="true"
        :left="true"
        :timeout="2000"
        @input="fecharSnackbar"
    >
        {{ getSnackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data () {
    return { 
       // usuario: {}
        snackbar: false,
        app: process.env.VUE_APP_NAME
    }
  },
    created() {
        this.syncUsuarioAction()
    },
    computed: {
        ...mapGetters({
            getUsuario: 'usuario/usuarioGetter',
            getSnackbar: 'noticias/getDados',
        }),
        usuario(){
            return this.getUsuario && Object.keys(this.getUsuario).length > 0 ? this.getUsuario : {};
        }
    },
    methods:{
        ...mapActions({
            syncUsuarioAction: 'usuario/syncUsuarioAction',
            removeUsuarioAction: 'usuario/removeUsuarioAction',
            setSnackbar: 'noticias/setDados',
        }),
        logoff(){
            this.removeUsuarioAction()
        }
    },
    // watch:{
    //     getUsuario(){
    //         this.usuario = Object.keys(this.getUsuario).lenth > 0 ? this.getUsuario : {};
    //     }
    // }
    watch: {
        getSnackbar(val) {
            this.snackbar = val.ativo;
        },
    },
}
</script>
