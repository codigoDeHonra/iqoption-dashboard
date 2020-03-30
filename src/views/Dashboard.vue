<template>
    <div>
        <v-container  flud grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Investimento Inicial</div>
                            <v-text-field
                                label="Investimento Inicial"
                                placeholder="100"
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
                            <div class="headline">Entrada: {{entry.toFixed(2)}}</div>
                            <v-text-field
                                label="Entrada Padrão"
                                placeholder="1000"
                                box
                                v-model="fixedInvestiment"
                                append-icon="fas fa-percent"
                            ></v-text-field>
                            <v-text-field
                                label="Payout Padrão"
                                placeholder="1000"
                                box
                                v-model="fixedPayout"
                                append-icon="fas fa-percent"
                            ></v-text-field>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex >
                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Investimento Atual</div>
                            <span class="display-3">{{currentInvestiment.toFixed(2)}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex>
                <v-card :color="(pnl() >= 0) ? 'green lighten-5' : 'red lighten-5'">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Ganhos/Perdas</div>
                            <span class="display-3">{{pnl().toFixed(2)}}</span>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>

        <v-btn color="primary" dark class="mb-2" @click="openInsertModal()">Nova Negociação</v-btn>
        <v-btn color="" dark class="mb-2" @click="removeTrades()">Apagar tudo</v-btn>
        <v-btn v-if="false" color="" class="mb-2" @click="insertSession()">Salvar Sessão</v-btn>
        <v-btn v-if="false" color="" class="mb-2" @click="removeAllSession()">Apagar todas Sessão</v-btn>

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
                                <v-flex xs12 sm6 md3>
                                    <v-text-field
                                        v-model="computedDateFormatted"
                                        label="Data"
                                        readonly
                                        v-on="on"
                                        box
                                    ></v-text-field>
                                </v-flex>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable @input="menu = false"></v-date-picker>
                        </v-menu>
                    </v-layout>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="brokerGetter"
                            item-text="name"
                            item-value="_id"
                            box
                            label="Corretora"
                            v-model="trade.broker"
                            return-object
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            label="Payout"
                            placeholder="82"
                            box
                            v-model="trade.payout"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md3>
                        <v-text-field
                            label="Quantidade"
                            placeholder="82"
                            box
                            v-model="trade.amount"
                        ></v-text-field>
                    </v-flex>


                    <v-flex xs12 sm6 md3>
                        <v-select
                            :items="getAsset"
                            item-text="name"
                            item-value="_id"
                            box
                            label="Ativo"
                            v-model="trade.asset"
                            return-object
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
                    <v-btn color="red darken-1" flat @click="loss()">Loss</v-btn>

                    {{total(trade).toFixed(2) }}
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
            :pagination.sync="pagination"
        >
            <template  v-slot:items="props">
                <tr >
                    <td class="text-xs-left">{{ props.index +1}}</td>
                    <td class="text-xs-left">{{ props.item.date | dateFormat}}</td>
                    <!--td class="text-xs-left">{{ categoryItem(props.item) }}</td-->
                    <td class="text-xs-left">{{ props.item.asset.name }}</td>
                    <td class="text-xs-right">{{ props.item.investiment }}</td>
                    <td class="text-xs-right">{{ props.item.payout }}</td>
                    <td :class="[props.item.payout > 0 ? 'green': 'red', 'lighten-5 justify-center']">
                        {{ total(props.item).toFixed(2) }}
                    </td>
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

        <v-tabs
            v-if="false"
            v-model="tabActive"
            color="cyan"
            dark
            slider-color="yellow"
        >
          <v-tab
                v-for="(n, index) in getDashboard.sessions"
                :key="index"
                ripple
          >
            Item {{ index }}

          </v-tab>
              <v-tab-item
                v-for="(n, index) in getDashboard.sessions"
                :key="index"
              >
            <v-card flat>

                <v-card color="" class="">
                    <v-card-title primary-title>
                        <div>
                            <div class="headline">Investimento Inicial {{n.initialInvestiment}}</div>
                        </div>
                    </v-card-title>
                </v-card>

                <v-data-table
                    :headers="headers"
                    :items="n.trades"
                    class="elevation-1"
                    :must-sort="true"
                    :rows-per-page="25"
                >
                    <template  v-slot:items="props">
                        <tr :class="[props.item.payout > 0 ? 'green': 'red', 'accent-1']">
                            <td class="text-xs-left">{{ props.index +1}}</td>
                            <td class="text-xs-left">{{ props.item.date | dateFormat}}</td>
                            <td class="text-xs-left">{{ props.item.asset }}</td>
                            <td class="text-xs-right">{{ props.item.investiment }}</td>
                            <td class="text-xs-right">{{ props.item.payout }}</td>
                            <td class="justify-center ">{{ total(props.item).toFixed(2) }}</td>
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


            </v-card>
              </v-tab-item>
         </v-tabs>

        </v-container>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import vue from 'vue';

  export default {
    name: 'Dashboard',
    data(){
      return {
          date:'',
          pagination: { rowsPerPage: 10 },
          fixedPayout: 0.0,
          fixedInvestiment: 2,
          initialInvestiment: 100.0,
          dialog: false,
          modalUpdate: false,
          tabActive: null,
          headers:[
              {
                  text: '#',
                  sortable: false,
                  align: 'left'
              },
              {
                  text: 'Data',
                  value: 'date',
                  sortable: true
              },
              {
                  text: 'Asset',
                  value: 'asset',
                  align: 'left',
                  sortable: false
              },
              {
                  text: 'Investimento',
                  value: 'invesment',
                  align: 'right',
                  sortable: false
              },
              {
                  text: 'payout',
                  value: 'payout',
                  align: 'right',
                  sortable: false
              },
              {
                  text: 'Ganho/Perda',
                  value: 'total',
                  align: 'center',
                  sortable: false
              },
          ],
          editedIndex: -1,
          trade: {
              date: new Date().toISOString().substr(0, 10),
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
              payout: 0,
              asset: '',
              investiment: 0,
              broker: '',
              amount: 0
          },
          defaultTrade: {
              date: new Date().toISOString().substr(0, 10),
              payout: this.fixedPayout,
              asset: '',
              investiment: this.entry,
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
              broker: '',
              amount: 0
          },
          pairs:['EUR/USD', 'USD/CHF', 'AUD/CAD', 'USD/JPY', 'GBP/USD'],
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
    async created() {
      await this.syncTradesAction()
      await this.syncCategoryAction()
      await this.syncBrokerAction()
      await this.syncAssetAction()
    },
    computed:{
        ...mapGetters({
            getDashboard: 'dashboard/getDashboard',
            getUsuario: 'usuario/usuarioGetter',
            getCategory: 'category/categoryGetter',
            brokerGetter: 'broker/brokerGetter',
            getAsset: 'asset/assetGetter',
        }),
        currentInvestiment(){
            return this.pnl() + parseFloat(this.initialInvestiment)
        },
        entry(){
            return this.initialInvestiment * (this.fixedInvestiment/100)
        },
        computedDateFormatted () {
            return this.formatDate(this.date)
        }
    },
    methods:{
        ...mapActions({
            syncTradesAction: 'dashboard/syncTradesAction',
            removeAction: 'dashboard/removeAction',
            updateAction: 'dashboard/updateAction',
            insertAction: 'dashboard/insertAction',
            removeAllAction: 'dashboard/removeAllAction',
            insertSessionAction: 'dashboard/insertSessionAction',
            removeAllSessionAction: 'dashboard/removeAllSessionAction',
            syncCategoryAction: 'category/syncAction',
            syncBrokerAction: 'broker/syncAction',
            syncAssetAction: 'asset/syncAction',
        }),
        openInsertModal () {
            this.trade = Object.assign({}, this.defaultValues())
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
            // console.log(item)
            item.index = index
            confirm('Tem certeza?') && this.removeAction(item)
        },
        close () {
            this.trade = Object.assign({}, this.defaultValues())
            this.dialog = false
        },
        save () {

            this.trade.usuarioId = this.getUsuario._id,
            this.trade.date = this.date,
                this.trade.asset = {
                    _id: this.trade.asset._id,
                    name: this.trade.asset.name,
                }
            this.insertAction(this.trade)

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
        },
        defaultValues(){
          return  {
              date: new Date().toISOString().substr(0, 10),
              payout: this.fixedPayout,
              asset: '',
              investiment: parseFloat(this.entry).toFixed(2),
              dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
          }
        },
        loss() {
            this.trade.payout = -100
        },
        insertSession() {
            let session = {
                trades: this.getDashboard.trades,
                initialInvestiment: this.initialInvestiment,
                currentInvestiment: this.currentInvestiment
            }

            this.insertSessionAction(session);
        },
        removeAllSession(){
            this.removeAllSessionAction()
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        categoryItem (item) {
            if (item){
                const index = this.getCategory.find(function(value){
                    return value._id == item._id  ? true : 'error'
                })
                return index.name
            }
        },
    },
    watch: {
      date(val) {
         const t = Object.assign({}, this.trade);
         t.date = val

         vue.set(this, 'trade', t)
      },
    }
  }
</script>
