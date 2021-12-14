<template>
  <div class="d-flex" ref="page">
      <Sidebar></Sidebar>
      <Menu></Menu>
      <Nuxt />
  </div>
</template>

<script>
import Sidebar from '/components/Sidebar.vue';
import Menu from '/components/Menu.vue';

export default {
   components: {
    Sidebar,Menu
  }
}
</script>
