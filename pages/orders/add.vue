<template>
  <PageContent title="Create Order">
    <b-form @submit="onSubmit" @change="onFormChange">
      <b-container fluid>
        <b-row>
          <b-col xl="6">
            <div class="form-group mb-0">
              <legend class="col-form-label d-flex align-items-center">
                <span>Order Number:</span>
                <span class="text-gray">{{form.orderNumber}}</span>
              </legend>
            </div>
            <div class="form-group mb-2">
              <legend class="col-form-label d-flex align-items-center">
                <span>Date & Time:</span>
                <span class="text-gray">{{form.time}}</span>
              </legend>
            </div>

            <b-form-group label="Name">
              <b-form-input v-model="form.name" type="text" placeholder="" required></b-form-input>
            </b-form-group>

            <b-form-group label="Contact">
              <b-form-input v-model="form.contact" type="text" placeholder="" @input="acceptNumber" required>
              </b-form-input>
            </b-form-group>

            <b-form-group label="Trans Type" class="md">
              <b-form-radio-group v-model="form.transType" required>
                <b-form-radio name="transType" value="Delivery">Delivery</b-form-radio>
                <b-form-radio name="transType" value="Takeaway">Takeaway</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group label="Message to client">
              <b-form-textarea v-model="form.messageToClient" placeholder="" rows="3" max-rows="6" required>
              </b-form-textarea>
            </b-form-group>

            <b-form-group class="position-relative" label="Order Items">
              <a class="checkbox-entry" @click="toggleOrders">
                {{selectItemsText}}
                <svg-icon name="icon/arrow-down" />
              </a>
              <div class="checkboxes" v-show="showOrders">
                <b-form-checkbox-group v-model="selections" :options="orders" value-field="id" text-field="name">
                </b-form-checkbox-group>
              </div>
              <table class="table table-borderless checked-table">
                <tbody>
                  <tr v-for="order in form.orderedItems" :key="order.id">
                    <td colspan="2">
                      {{order.name}}
                    </td>
                    <td>
                      {{order.value}}$
                    </td>
                    <td>
                      <div class="count">
                        <a @click="setOrder(order.id,'dec')">
                          -
                        </a>
                        <span>{{order.count}}</span>
                        <a @click="setOrder(order.id,'inc')">
                          +
                        </a>
                      </div>
                    </td>
                    <td>
                      <a @click="removeOrder(order)" class="remove">
                        <svg-icon name="icon/x" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-form-group>

          </b-col>
          <b-col xl="5" class="border-xl">
            <div class="summary">
              <div class="summary__wrapper">
                <p class="summary__title">Delivery Details</p>
                <table class="table table-borderless summary__table">
                  <thead>
                    <tr>
                      <th>
                        Order Item
                      </th>
                      <th>
                        Number
                      </th>
                      <th>
                        Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="form.orderedItems.length < 1">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr v-for="item in form.orderedItems" :key="item.id">
                      <td>
                        {{item.name}}
                      </td>
                      <td class="font-weight-medium">
                        {{item.count}}
                      </td>
                      <td>
                        {{item.cost}}$
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="summary__total">
                <div>
                  Total Amount:
                </div>
                <span v-if="totalAmount > 0">
                  {{totalAmount}}$
                </span>
                <span v-else>
                  -
                </span>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-6">
                <template v-if="formValid">
                  <NuxtLink class="btn btn-block py-1 btn-outline-secondary" to="/orders">
                    Cancel
                  </NuxtLink>
                </template>
              </div>
              <div class="col-lg-6">
                <b-button class="btn-block py-1" type="submit" :variant="formValid ? 'success' : 'primary'">Add Order
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </PageContent>
</template>

<script>
  import PageContent from '/components/PageContent.vue'
  import {  mapGetters } from 'vuex'

  export default {
    layout: 'default',
    head() {
      return {
        title: "Create Order",
      }
    },
    data() {
      return {
        form: {
          orderNumber:1,
          name: "",
          contact: "",
          transType: "",
          messageToClient: "",
          orderedItems: [],
          time:"",
        },
        orders: [{
            id: 1,
            value: 29,
            name: 'Beef Stroganoff',
            count: 1
          },
          {
            id: 2,
            value: 15,
            name: 'Reuben',
            count: 1
          },
          {
            id: 3,
            value: 21,
            name: 'Sandwich',
            count: 1
          },
          {
            id: 4,
            value: 24,
            name: 'Waldorf Salad',
            count: 1
          },
          {
            id: 5,
            value: 32,
            name: 'French Fries',
            count: 1
          },
          {
            id: 6,
            value: 17,
            name: 'Caesar Salad',
            count: 1
          },
          {
            id: 7,
            value: 38,
            name: 'Chicken à la King',
            count: 1
          },
          {
            id: 8,
            value: 52,
            name: 'Lobster Newburg',
            count: 1
          },
          {
            id: 9,
            value: 14,
            name: 'Salisbury Steak',
            count: 1
          },
        ],
        selections: [],
        totalAmount: 0,
        formValid: false,
        showOrders: false,
        selectItemsText: "Pending",
      }
    },
    components: {
      PageContent
    },
    computed: {
      ...mapGetters({
        getLastOrderNumber: 'getLastOrderNumber'
      })
    },
    mounted(){
       if (!process.client) return;
      const orders = sessionStorage.getItem("orders");
      var _t = this;
      if (orders) {
        _t.$store.commit('restoreOrder', JSON.parse(orders))
        _t.form.orderNumber = this.getLastOrderNumber + 1;
      }
    },
    created() {
      setInterval(this.getNow, 1000);
    },
    watch: {
      selections: function (newValue, old) {
        this.setSelectedOrders();
      },
    },
    methods: {
      acceptNumber(e) {
        let x = e.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
        this.form.contact = !x[2] ? x[1] : '+' + x[1] + ' ' + x[2] + (x[3] ? '' + x[3] : '');
      },
      setSelectedOrders() {
        let _t = this;
        let selections = _t.selections;
        _t.form.orderedItems = [];
        selections.forEach((el) => {
          let order = _t.orders.filter(x => x.id === el)[0]
          _t.form.orderedItems.push(order);
        })
        this.setSummary();
      },
      setSummary() {
        let _t = this;
        let items = _t.form.orderedItems;
        let totalAmount = 0;
        _t.selectItemsText = "";
        items.forEach((item, i, ar) => {
          item.cost = item.count * item.value;
          totalAmount += item.cost;
          _t.selectItemsText += item.name + ",";
        });
        if (!_t.form.orderedItems.length) {
          _t.selectedItemsText = "Pending";
        }
        _t.totalAmount = totalAmount;
      },
      toggleOrders() {
        this.showOrders = !this.showOrders;
      },
      getNow: function () {
        const today = new Date();
        const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + ' at ';
        const time = this.formatAMPM(today);
        const dateTime = date + ' ' + time;
        this.form.time = dateTime;
      },
      formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      },
      setOrder(id, type) {
        let _t = this;
        let order = this.form.orderedItems.filter((x) => x.id === id)[0];
        if (type === 'inc') {
          order.count++
        } else {
          if (order.count > 1) {
            order.count--;
          }
        }
        order.cost = order.count * order.value
        this.setSummary()
      },
      removeOrder(item) {
        this.form.orderedItems.filter((x) => x.id === item.id)[0].count = 1;

        var selectedItemIndex = this.form.orderedItems.indexOf(item);
        this.form.orderedItems.splice(selectedItemIndex, 1);

        var selectionIndex = this.selections.indexOf(item.id);
        this.selections.splice(selectionIndex,1);

        this.setSelectedOrders()
      },
      checkFormValid(){
        var _t =this;
        var form = this.form;
        var isValid = true;
        Object.keys(form).forEach((e,i)=>{
           if(Array.isArray(form[e])) {
             if(form[e].length == 0 ){
               isValid = false;
             }
           } else {
             if(form[e] == '') {
               isValid = false;
             }
           }
        })

        if(isValid) {
          _t.formValid = true;
        } else{
          _t.formValid = false;
        }
      },
      onFormChange(e){
        this.checkFormValid()
      },
      onSubmit(e){
        e.preventDefault();
        this.$store.commit('addOrder', this.form)
        sessionStorage.setItem('orders',JSON.stringify(this.$store.state.orders))
        this.$router.go(-1)
      }
    },
  }

</script>


<style lang="scss">
  .font-weight-medium {
    font-weight: 500;
  }

  .sort {
    .dropdown-toggle {
      @include setColor(text-box-color, true);
      padding: rem(15);

      &:after {
        content: none !important;
      }

      svg {
        width: rem(15);
        height: rem(15);
        margin-right: rem(15);
      }
    }


  }
.checkboxes{
 .custom-control-inline {
        display: block !important;
      }
}
</style>
<style lang="scss" scoped>
  .border-xl {
    @include media-breakpoint-up(xlg) {
      border-left: 1px solid getColor(border-color);
    }
  }

  .options {
    @include flex-between();
    @include align-center();
  }

  .options {
    @include flex-y-center();
    border-bottom: 1px solid getColor(border-color);
    padding-bottom: rem(28);
    margin-bottom: rem(30);
  }

  .text-gray {
    @include setFont(18, regular, dark-gray);
  }

  .col-form-label {
    span:nth-child(1) {
      min-width: 130px;
      margin-right: 20px;
    }
  }

  .summary {
    &__wrapper {
      @include setColor(light-card-color, true);
      padding: rem(25) rem(22);
    }

    &__title {
      padding-left: 3px;
      @include setFont(18, medium, black);
    }

    &__table {
      margin-top: rem(25);

      thead {
        th {
          padding: 0 3px;
          @include setFont(17, regular, dark-gray);
        }
      }

      tbody {
        td {
          padding: 3px;
          @include setFont(18, medium, black);
        }
      }
    }

    &__total {
      @include setColor(light-card-color, true);
      padding: rem(22) rem(26);
      margin-top: rem(24);
      margin-bottom: rem(32);
      @include flex-between();

      div {
        @include setFont(24, semibold, black);
      }

      span {
        @include setFont(24, medium, black);
        opacity: 0.84;
      }
    }
  }

  .checkbox-entry {
    padding: rem(15) rem(22) rem(15);
    @include setFont(18, medium, black);
    border: 1px solid getColor(border-color);
    border-radius: rem(5);
    @include flex-y-center();
    margin-top: 13px;
    min-height: rem(50);
    position: relative;

    svg {
      @include absolute {
        right: rem(15);
        top: 50%;
      }

      transform:translateY(-50%);
      width:rem(18);
      height: rem(18);
    }

    &:hover {
      text-decoration: none;
      color: getColor(black);
    }
  }

  .checkboxes {
    @include absolute {
      right: 0;
      left: 0;
    }

    z-index: 2;
    background-color: getColor(white);
    border:1px solid getColor(border-color);
    border-radius: 5px;
    padding: rem(25) rem(17);

    >div {
      margin-bottom: 0 !important;
    }
  }

  .checked-table {
    margin-top: rem(24);

    td {
      padding: rem(6);
      @include setFont(18, regular, black);
      vertical-align: middle;
    }

    .remove {
      cursor: pointer;

      svg {
        width: 12px;
        height: 12px;
      }
    }

    .count {
      border: 2px solid getColor(primary);
      border-radius: 12px;
      // padding:10px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      min-width: 70px;

      a {
        cursor: pointer;
        @include setFont(16, regular, #AAAAAA);
        width: 14px;
        height: 24px;
        display: inline-block;
        width: 15px;
        text-align: center;

        &:hover {
          text-decoration: none;
        }
      }

      span {
        @include setFont(14, medium, black);
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }

</style>
