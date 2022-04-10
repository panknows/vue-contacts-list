<template>
  <VContactForm ref="form" @submit="onSubmit" />
</template>

<script>
import { mapActions } from 'vuex';

import { VContactForm } from '@/components/VContactForm';

export default {
  name: 'VCreateContactForm',
  components: {
    VContactForm,
  },
  methods: {
    ...mapActions({
      add: 'addContact',
    }),
    onSubmit(form) {
      this.add({ ...form });
      this.$refs.form.reset();
    },
  },
};
</script>
