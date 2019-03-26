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

                            <v-text-field
                                placeholder="1000"
                                box
                                v-model="initialInvestiment"
                            ></v-text-field>

                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Entrada</div>
                            <span>{{entry.toFixed(2)}}</span>
                            <v-text-field
                                placeholder="1000"
                                box
                                v-model="fixedInvestiment"
                            ></v-text-field>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Banca Atual</div>
                            <span>{{currentInvestiment.toFixed(2)}}</span>
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
                            <div class="headline">Ganhos/Perdas</div>
                            <span>{{pnl().toFixed(2)}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-btn color="primary" dark class="mb-2" @click="openInsertModal()">Nova Negociação</v-btn>
        <v-btn color="" dark class="mb-2" @click="removeTrades()">Apagar tudo</v-btn>

        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-btn color="blue darken-1" flat @click="close()">Cancelar</v-btn>
                    <v-btn v-if="!modalUpdate" color="blue darken-1" flat @click="save()">Salvar</v-btn>
                    <v-btn v-if="modalUpdate" color="blue darken-1" flat @click="update()">Atualizar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-data-table
            :headers="headers"
            :items="getDashboard.trades"
            class="elevation-1"
            :must-sort="true"
        >
            <template  v-slot:items="props">
                <tr :class="[props.item.payout > 0 ? 'green': 'red', 'accent-1']">
                    <td>{{ props.index +1}}</td>
                    <td>{{ props.item.date | dateFormat}}</td>
                    <td class="">{{ props.item.asset }}</td>
                    <td class="">{{ props.item.investiment }}</td>
                    <td class="">{{ props.item.payout }}</td>
                    <td class="">{{ total(props.item).toFixed(2) }}</td>
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
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';

  export default {
    name: 'Dashboard',
    data(){
      return {
          fixedInvestiment: 2,
          initialInvestiment: 0.0,
          dialog: false,
          modalUpdate: false,
          headers:[
              {
                  text: '#',
                  sortable: false
              },
              {
                  text: 'data',
                  value: 'date',
                  sortable: true
              },
              {
                  text: 'asset',
                  value: 'asset',
                  sortable: false
              },
              {
                  text: 'invesment',
                  value: 'invesment',
                  sortable: false
              },
              {
                  text: 'payout',
                  value: 'payout',
                  sortable: false
              },
              {
                  text: 'total',
                  value: 'total',
                  sortable: false
              },
          ],
          editedIndex: -1,
          trade: {
              date: new Date().toISOString().substr(0, 10),
              payout: 0,
              asset: '',
              investiment: 0,
          },
          defaultTrade: {
              date: new Date().toISOString().substr(0, 10),
              payout: 0,
              asset: '',
              investiment: 0,
          },
          pairs:['EUR/USD', 'USD/CHF'],
          date: new Date().toISOString().substr(0, 10),
          menu: false,
          modal: false,
          menu2: false
      }
    },
      filters: {
        dateFormat: function (value) {
            moment.locale('pt-br')
            return moment(value).format('DD-MM-YYYY')
          }
      },
    mounted(){
    },
    methods:{
        ...mapActions({
            removeAction: 'dashboard/removeAction',
            updateAction: 'dashboard/updateAction',
            insertAction: 'dashboard/insertAction',
            removeAllAction: 'dashboard/removeAllAction'
        }),
        openInsertModal () {
            this.modalUpdate = false
            this.dialog = true
        },
        openUpdateModal (item) {
            this.modalUpdate = true
            const index = this.getDashboard.trades.indexOf(item)
            this.trade = this.getDashboard.trades[index]
            this.trade.index = index

            this.dialog = true
        },
        deleteItem (item) {
            const index = this.getDashboard.trades.indexOf(item)
            confirm('Tem certeza?') && this.removeAction(index)
        },
        close () {
            this.trade = Object.assign({}, this.defaultTrade)
            this.dialog = false
        },
        save () {
            this.insertAction(this.trade)
            this.trade = Object.assign({}, this.defaultTrade)
            this.dialog = false
            this.close()
            this.modalUpdate = false
        },
        update () {
            this.updateAction(this.trade)
            this.close()
            this.modalUpdate = false
        },
        total (trade) {
            const total = parseFloat(trade.investiment) *( parseFloat(trade.payout) / 100)

            return total
        },
        pnl () {

            const pnl = this.getDashboard.trades.reduce(function(acc, value) {
                return acc + (parseFloat(value.investiment) * ( parseFloat(value.payout) / 100))
            }, 0)

            return pnl
        },
        removeTrades() {
            this.removeAllAction()
        }
    },
    computed:{
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
        }),
        currentInvestiment(){
            return this.pnl() + parseFloat(this.initialInvestiment)
        },
        entry(){
            return this.initialInvestiment * (this.fixedInvestiment/100)
        }
    }
  }
</script>
