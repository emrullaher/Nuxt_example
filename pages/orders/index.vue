<template>
  <PageContent title="Accepted">
    <div class="options">
      <b-dropdown class="sort" variant="light" no-caret>
        <template #button-content>
          <svg-icon name="icon/toggler" />
          Showing 10 Orders
        </template>
        <b-dropdown-item>Lorem ipsum dolor sit amet.</b-dropdown-item>
        <b-dropdown-item>Lorem ipsum dolor sit amet.</b-dropdown-item>
      </b-dropdown>

      <NuxtLink to="/orders/add" class="btn btn-primary btn-sm">
        Add New Order
      </NuxtLink>
    </div>

    <ul class="orders">
      <li class="orders__item" v-for="order in orders" :key="order.orderNumber">
        <div class="row row-cols-2 row-cols-md-4 row-cols-xl-6 orders__detail">
          <div class="col">
            <span>Order number</span>
            <p>{{order.orderNumber}}</p>
          </div>
          <div class="col">
            <span>Date & Time</span>
            <p>{{order.time}}</p>
          </div>
          <div class="col">
            <span>Name</span>
            <p>{{order.name}}</p>
          </div>
          <div class="col">
            <span>Contact</span>
            <p>{{order.contact}}</p>
          </div>
          <div class="col">
            <span>Trans Type</span>

            <span class="badge"
              :class="{'badge--primary':order.transType === 'Delivery','badge--orange':order.transType === 'Takeaway'}">{{order.transType}}</span>
          </div>
          <div class="col">
            <span>Amount</span>
            <p>
              {{order.amount}}$
              <span class="badge badge--dark-yellow" v-if="order.transType === 'Delivery'">
                COD
              </span>
            </p>
          </div>
        </div>
        <div class="orders__ordered d-flex align-items-center">
          <span class="mr-2">
            Ordered<br>
            Items
          </span>
          <ul>
            <li v-for="item in order.orderedItems" :key="item.id">
              {{item.name}} X {{item.count}}
            </li>
          </ul>
        </div>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="orders__message">
            <span>
              Additional information from customer
            </span>
            <p>{{order.messageToClient}}</p>
          </div>
          <div class="d-flex align-items-center">
            <a href="#" class="mr-4">
              <svg-icon name="icon/printer" class="w-28" />
            </a>

            <a href="#" class="btn btn-primary">
              Move to Cooking
            </a>
          </div>
        </div>
      </li>
    </ul>
  </PageContent>
</template>

<script>
  import PageContent from '/components/PageContent.vue'
  export default {
    layout: 'default',
    head() {
      return {
        title: "Orders",
      }
    },
    data() {
      return {
        orders: [],
      }
    },
    mounted() {
      if (!process.client) return;
      const orders = sessionStorage.getItem("orders");
      var _t = this;
      if (orders) {
        _t.$store.commit('restoreOrder', JSON.parse(orders))
        _t.orders = _t.$store.state.orders.slice(0,10);
        _t.orders.forEach((el)=>{
            var amount = 0;
            el.orderedItems.map((x) => amount += x.cost);
            el.amount = amount;
        })
      }
    },
    components: {
      PageContent
    }
  }

</script>


<style lang="scss">
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

</style>
<style lang="scss" scoped>
  .w-28 {
    width: 28px;
    height: 28px;
  }

  .options {
    @include flex-between();
    @include align-center();
    border-bottom: 1px solid getColor(border-color);
    padding-bottom: rem(28);
    margin-bottom: rem(30);
  }

  .orders {
    padding-bottom: rem(50);
    &__item {
      border: 1.5px solid getColor(border-color);
      border-radius: rem(10);
      padding: rem(27) rem(26) rem(26) rem(43);

      & + & {
        margin-top:rem(20);
      }
    }

    &__detail {
      margin-bottom: rem(30);

      span:not(.badge) {
        @include setFont(17, regular, dark-gray);
        display: block;
      }

      p {
        @include setFont(18, medium, black);
        margin: 0;
      }
    }

    &__ordered {
      margin-bottom: rem(40);
      span {
        @include setFont(18, medium, dark-gray);
        display: block;
        margin-right: rem(10);
        margin-top: rem(20);
      }

      ul {
        @include flex-y-center();

        li {
          @include setColor(text-box-color, true);
          padding: rem(9);
          text-align: center;
          @include setFont(18, medium, black);
          border-radius: 4px;
          margin-top: rem(20);
          &:not(:last-child) {
            margin-right: rem(20);
          }
        }
      }
    }

    &__message{
      span{
        @include setFont(18,medium,dark-gray);
      }
      p{
        @include setFont(18,semibold,black);
      }
    }
  }

</style>
