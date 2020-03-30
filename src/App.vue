<template>
  <v-app>
    <v-toolbar app dark color="blue darken-4">
      <v-toolbar-title class="headline text-uppercase">
          <v-btn to="/dashboard" link small >{{app}}</v-btn>
      </v-toolbar-title>
      <v-btn flat to="/meus-ativos">
          Ativo
      </v-btn>
      <v-spacer></v-spacer>
     <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>Configuração</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-tile @click="$router.push('/categoria')">
            <v-list-tile-title >
               Categoria 
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push('/carteira')">
            <v-list-tile-title >
               Carteira 
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push('/corretora')">
            <v-list-tile-title >
               Corretora 
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push('/ativo')">
            <v-list-tile-title >
               Ativo
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu> 

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
