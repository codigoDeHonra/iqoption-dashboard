<template>
    <div>
        <v-container  flud grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Banca Inicial</div>
                            <span>{{getDashboard.banca.total}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Banca Total</div>
                            <span>{{getDashboard.banca.total}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-layout align-center justify-center row >
            <v-flex>
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Ganhos</div>
                            <span>{{getDashboard.banca.total}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Perdas</div>
                            <span>{{getDashboard.banca.total}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Nova Negociação</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Operação</span>
                </v-card-title>

                <v-card-text>
                    <v-layout xs12 sm6 md4>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="trade.date"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    label="Data"
                                    readonly
                                    v-on="on"
                                    box
                                    v-model="trade.date"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="trade.date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(trade.date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-layout>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            label="Payout"
                            placeholder="82"
                            box
                            v-model="trade.payout"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="pairs"
                            box
                            label="Par de moeda"
                            v-model="trade.asset"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            label="Investimento"
                            placeholder="1000"
                            box
                            v-model="trade.investiment"
                        ></v-text-field>
                    </v-flex>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table
            :headers="headers"
            :items="getDashboard.trades"
            class="elevation-1"
        >
            <template v-slot:items="props">
                <td>{{ props.item.date }}</td>
                <td class="">{{ props.item.asset }}</td>
                <td class="">{{ props.item.investiment }}</td>
                <td class="">{{ props.item.total }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(props.item)"
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
            </template>
        </v-data-table>
        </v-container>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data(){
      return {
          dialog: false,
          headers:[
              {
                  text: 'data',value: 'date'
              },
              {
                  text: 'asset', value: 'asset'
              },
              {
                  text: 'invesment', value: 'invesment'
              },
              {
                  text: 'total', value: 'total'
              },
          ],
          editedIndex: -1,
          trade: {
              date: new Date().toISOString().substr(0, 10),
              payout: 0,
              asset: '',
              investiment: 0,
          },
          defaultItem: {
              name: '',
              calories: 0,
              fat: 0,
              carbs: 0,
              protein: 0
          },
          pairs:['EUR/USD'],
          date: new Date().toISOString().substr(0, 10),
          menu: false,
          modal: false,
          menu2: false
      }
    },
    methods:{
        ...mapActions({
            removeAction: 'dashboard/removeAction',
            insertAction: 'dashboard/insertAction'
        }),
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.getDashboard.trades.indexOf(item)
            confirm('Tem certeza?') && this.removeAction(index)
        },

        close () {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save () {

            this.insertAction(this.trade)

            this.close()

        }
    },
    computed:{
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
        })
    }
  }
</script>
