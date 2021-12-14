<template>
  <div class="menu">
    <h1 class="menu__title">Orders</h1>

    <ul class="menu-list">
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          New Order
          <span>0</span>
        </a>
      </li>
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          Accepted
          <span>3</span>
        </a>
      </li>
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          Cooking
          <span>3</span>
        </a>
      </li>
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          Parcel Ready
          <span>3</span>
        </a>
      </li>
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          Delivered
          <span>3</span>
        </a>
      </li>
      <li class="menu-list__item">
        <a href="" class="menu-list__link">
          Completed
          <span>3</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
      name:"Menu",
  }

</script>

<style lang="scss" scoped>
    .closed .menu{
      left:-100%;
    }

    .menu{
      @include setColor(menu-bg,true);
      width:$menu-width;
      padding:rem(27) rem(26);
      border:$border-primary;
      @include fixed {
        top: 0;
        left: $sidebar-width;
        bottom: 0;
      }
      overflow-x: hidden;
      overflow-y: auto;
      @include scrollBar(getColor(light-gray), getColor(dark-gray));
      transition:.2s;
      z-index:5;



      &__title{
        font-weight: 500;
      }

      &-list{
        margin-top: rem(24);
        &__link{
          padding: rem(13) 0;
          @include flex-between();
          @include setFont(18,medium,black);

          &--active,&:hover,&:active,&:focus{
              @include setColor(primary);
              text-decoration: none;
          }

          span{
            @include setColor(light-gray);
          }
        }
      }
    }
</style>
