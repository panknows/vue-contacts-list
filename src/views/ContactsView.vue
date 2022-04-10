<template>
  <div>
    <pre>{{ contacts }}</pre>
    <h1>
      Contacts list
    </h1>
    <VContactsList :items="contacts.data" />
    <h1>
      Create contact form
    </h1>
    <VCreateContactForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VCreateContactForm, VContactsList } from '@/components';

export default {
  name: 'ContactsView',
  components: {
    VCreateContactForm,
    VContactsList,
  },
  computed: {
    ...mapGetters({
      contacts: 'getContacts',
    }),
  },
};
</script>
