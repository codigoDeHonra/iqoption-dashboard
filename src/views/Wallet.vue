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
                            <h3>Wallet: {{ this.walletItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-flex xs12 >
                                    <v-select
                                        :items="getCategory"
                                        item-text="name"
                                        item-value="_id"
                                        box
                                        label="Categoria"
                                        v-model="walletItem.category"
                                    ></v-select>
                                </v-flex>
                                <v-text-field
                                    v-model="walletItem.name"
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
                                     {{ this.walletItem._id ? 'Atualizar': 'Cadastrar' }}
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
            :items="walletGetter"
            class="elevation-1"
            :must-sort="true"
        >
            <template  v-slot:items="props">
                <tr >
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.category }}</td>
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
            name: '',
            category: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
                  {
                      text: 'Categoria',
                      value: 'category',
                      sortable: false,
                      align: 'left'
                  },
            ],
            walletItem: {}
        };
    },
    async created() {
      await this.syncWalletAction()
    },
    computed: {
        ...mapGetters({
            walletGetter: 'wallet/walletGetter',
            getCategory: 'category/categoryGetter',
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
            insertWalletAction: 'wallet/insertAction',
            syncWalletAction: 'wallet/syncAction',
            removeAction: 'wallet/removeAction',
            updateWalletAction: 'wallet/updateAction',
            syncCategoryAction: 'category/syncAction',
        }),
        submit() {
            const wallet = { 
                _id: this.walletItem._id, 
                name: this.walletItem.name, 
                category: this.walletItem.category, 
            };

            if(this.walletItem._id) {
                this.updateWalletAction(wallet);
            } else {
                this.insertWalletAction(wallet);
            }

        },
        deleteItem (item) {
            const index = this.walletGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.walletGetter.indexOf(item)
            this.walletItem = this.walletGetter[index]
        },
        reset () {
            this.walletItem = {} 
        },
    }
}
</script>
