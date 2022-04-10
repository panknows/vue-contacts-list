<template>
  <div>
    <pre>{{ contacts }}</pre>
    <h1>
      Create contact form
    </h1>
    <VCreateContactForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VCreateContactForm } from '@/components';

export default {
  name: 'ContactsView',
  components: {
    VCreateContactForm,
  },
  computed: {
    ...mapGetters({
      contacts: 'getContacts',
    }),
  },
};
</script>
