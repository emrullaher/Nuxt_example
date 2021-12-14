<template>
  <section class="content">
    <div class="content__header">
      <button @click="menuClose" class="toggler">
        <svg-icon name="icon/toggler" />
      </button>
      {{title}}
    </div>
    <div class="content__wrapper">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: "PageContent",
    props: {
      title: String,
    },
    methods: {
      menuClose() {
        this.$root.$el.classList.toggle('closed');
      }
    }
  }

</script>

<style lang="scss" scoped>
  .closed {
    .content {
      margin-left: $sidebar-width;
    }
  }

  .content {
    padding: rem(35) rem(38);
    width: 100%;
    transition: width .3s ease-in-out;
    overflow-y: scroll;
    @include hideScroll();
    margin-left: calc(#{$sidebar-width} + #{$menu-width});

    &__header {
      @include flex-y-center();
      @include setFont(30, medium, heading-color);
    }

    &__wrapper {
      padding-top: rem(30);
    }
  }

  .toggler {
    @include resetButton();
    margin-right: rem(25);

    svg {
      width: rem(20);
      height: rem(20);
    }
  }

</style>
