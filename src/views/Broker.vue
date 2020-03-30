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
                            <h3>Corretora: {{ this.brokerItem.name }}</h3>
                            <v-form
                                ref="form"
                                v-model="valid"
                            >
                                <v-text-field
                                    v-model="brokerItem.name"
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
                                     {{ this.brokerItem._id ? 'Atualizar': 'Cadastrar' }}
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
            :items="brokerGetter"
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
            name: '',
            headers:[
                  {
                      text: 'Nome',
                      value: 'name',
                      sortable: false,
                      align: 'left'
                  },
            ],
            brokerItem: {}
        };
    },
    created() {
        this.syncBrokerAction()
    },
    computed: {
        ...mapGetters({
            brokerGetter: 'broker/brokerGetter',
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
            insertBrokerAction: 'broker/insertAction',
            syncBrokerAction: 'broker/syncAction',
            removeAction: 'broker/removeAction',
            updateBrokerAction: 'broker/updateAction',
        }),
        submit() {
            const broker = { 
                _id: this.brokerItem._id, 
                name: this.brokerItem.name, 
            };

            if(this.brokerItem._id) {
                this.updateBrokerAction(broker);
            } else {
                this.insertBrokerAction(broker);
            }

        },
        deleteItem (item) {
            const index = this.brokerGetter.indexOf(item)
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        openUpdateModal (item) {
            const index = this.brokerGetter.indexOf(item)
            this.brokerItem = this.brokerGetter[index]
        },
        reset () {
            this.brokerItem = {} 
        },
    }
}
</script>
