<template>
  <b-list-group>
    <template v-for="(item, i) in items">
      <b-list-group-item
        :key="i"
        :to="{ name: 'contact', params: { id: item.id } }"
        class="d-flex align-items-center"
      >
        <b-avatar variant="primary" :text="item.name[0]" class="mr-3"></b-avatar>
        {{ item.name }}
      </b-list-group-item>
    </template>
  </b-list-group>
</template>

<script>
export default {
  name: 'VContactsList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
