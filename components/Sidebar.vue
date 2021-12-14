<template>
  <aside class="sidebar">
    <div class="brand">
      <NuxtLink to="/">
        <picture class="brand__logo">
          <svg-icon name="logo" />
        </picture>
      </NuxtLink>
    </div>

    <ul class="sidebar-list">
      <li class="sidebar-list__item">
        <NuxtLink to="/orders" class="sidebar-list__link">
          <img  src="~/assets/img/sidebar/orders.png" />
        </NuxtLink>
      </li>
      <li class="sidebar-list__item">
        <a class="sidebar-list__link">
          <img  src="~/assets/img/sidebar/box.png" />
        </a>
      </li>
      <li class="sidebar-list__item">
        <a class="sidebar-list__link">
          <img  src="~/assets/img/sidebar/settings.png" />
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
  export default {
    name: 'Sidebar',
  }

</script>

<style lang="scss" scoped>
  .brand {
    padding: rem(14) rem(12) rem(15) rem(11);

    &__logo {
      width: rem(62);
      height: rem(62);

      svg,
      img {
        width: rem(62);
        height: rem(62);
      }
    }
  }

  .sidebar {
    @include setColor(sidebar-bg, true);
    @include fixed {
      top: 0;
      left: 0;
      bottom: 0;
    }
    overflow-x: hidden;
    overflow-y: auto;
    @include scrollBar(getColor(light-gray), getColor(dark-gray));
    width:$sidebar-width;
    transition:.2s;
    z-index:5;


    &-list {

      &__link {
        @include flex-center();
        height: rem(62);

        svg {
          width: rem(30);
          height: rem(30);
        }

        &.nuxt-link-active {
          @include setColor(sidebar-active-link, true);
        }
      }

    }
  }

</style>
