<template>
  <div>
    contact id: {{ $route.params.id }}
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const contacts = vm.$store.getters.getContacts?.data;
      const id = Number(to.params?.id);

      if (!contacts.some((item) => {
        const contactId = item.id;

        return !Number.isNaN(id) && contactId === id;
      })) {
        next({ name: 'index' });
      }
    });
  },
};
</script>
