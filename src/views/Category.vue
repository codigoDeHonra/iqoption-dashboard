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
                            <h3>Categoria: {{ this.categoryItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="categoryItem.name"
                                    required
                                    box
                                    label="Nome"
                                />
                                <v-layout justify-space-between>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        block
                                        @click="submit()"
                                    >
                                     {{ this.categoryItem._id ? 'Atualizar': 'Cadastrar' }}
                                    </v-btn>
                                    <v-btn
                                        :class=" { 'green darken-4 white--text' : valid, disabled: !valid }"
                                        color="teal lighten-1"
                                        dark
                                        block
                                        @click="reset()"
                                    >
                                    Cancelar
                                    </v-btn>
                                </v-layout>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="categoryGetter"
            class="elevation-1"
            :must-sort="true"
        >
            <template  v-slot:items="props">
                <tr >
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                            small
                            class="mr-2"
                            @click="openUpdateModal(props.item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
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
            name: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
            ],
            categoryItem: {}
        };
    },
    created() {
        this.syncCategoryAction()
    },
    computed: {
        ...mapGetters({
            categoryGetter: 'category/categoryGetter',
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
            insertCategoryAction: 'category/insertAction',
            syncCategoryAction: 'category/syncAction',
            removeAction: 'category/removeAction',
            updateCategoryAction: 'category/updateAction',
        }),
        submit() {
            const category = { 
                _id: this.categoryItem._id, 
                name: this.categoryItem.name, 
            };

            if(this.categoryItem._id) {
                this.updateCategoryAction(category);
            } else {
                this.insertCategoryAction(category);
            }

        },
        deleteItem (item) {
            const index = this.categoryGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.categoryGetter.indexOf(item)
            this.categoryItem = this.categoryGetter[index]
        },
        reset () {
            this.categoryItem = {} 
        },
    }
}
</script>
