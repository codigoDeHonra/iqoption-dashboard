<template>
    <div>
        <v-container  flud grid-list-md text-xs-center>

        <v-layout
            flex
            align-center
            justify-center
        >
            <v-flex
                xs4
                sm4
            >
                <bar :chart-data="datacollection"></bar>
            </v-flex>
        </v-layout>

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
        </v-container>
    </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import moment from 'moment';
  import vue from 'vue';
  import Bar from '../components/Pie'

  export default {
    name: 'Dashboard',
      components:{
          Bar
      },
    data(){
      return {
                  datacollection: null,
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
      mounted() {
                this.fillData()
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
        fillData () {
            this.datacollection = {
              labels: [this.getRandomInt(), this.getRandomInt()],
              datasets: [
                {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: [this.getRandomInt(), this.getRandomInt()]
                }, {
                  label: 'Data One',
                  backgroundColor: '#f87979',
                  data: [this.getRandomInt(), this.getRandomInt()]
                }
              ]
            }
        },
        getRandomInt () {
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
        }
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
