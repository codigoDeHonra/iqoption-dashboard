<template>
    <v-container
        fluid
        fill-height
    >
        <v-layout
            flex
            align-center
            justify-center
        >
            <v-flex
                xs12
                sm4
                elevation-6
            >
                <v-card class="green darken-4 justify-center">
                    <v-layout
                        row
                        align-center
                        justify-center
                    >
                    </v-layout>
                    <v-card-text class="pt-4 white">
                        <div>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="email"
                                    required
                                    box
                                    prepend-icon="email"
                                    label="E-mail"
                                />
                                <v-text-field
                                    v-model="password"
                                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                    :type="e1 ? 'password' : 'text'"
                                    :rules="senhaRules"
                                    label="Senha"
                                    required
                                    box
                                    prepend-icon="lock"
                                    @click:append="() => (e1 = !e1)"
                                />
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="blue darken-4"
                                        dark
                                        block
                                        @click="submit()"
                                    >
                                        Entrar
                                    </v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name:'Login',
    data() {
        return {
            valid: true,
            e1: 'visibility',
            password: '',
            senhaRules: [
                v => !!v || 'Preencher Senha!',
            ],
            email: ''
        };
    },
    created(){
        localStorage.removeItem('user');
        this.removeAction()
    },
    computed: {
        ...mapGetters({
            usuarioGetter: 'usuario/usuarioGetter',
        }),
    },
    watch: {
        usuarioGetter(value) {
            if (value.status) {
                window.location.replace(value.redirect);
            }
        },
    },
    methods: {
        ...mapActions({
            loginAction: 'usuario/setUserLoginAction',
            removeAction: 'usuario/removeUsuarioAction',
        }),
        submit() {
            const user = { email: this.email, password: this.password };
            this.loginAction(user);
        },
    }
}
</script>
