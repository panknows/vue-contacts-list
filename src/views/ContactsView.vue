<template>
  <div>
    <pre>{{ contacts }}</pre>
    <h1>
      Search
    </h1>
    <VSearch
      v-model="search.data"
      :items="contacts.data"
      search-by-property="name"
      @active="(val) => search.isActive = val"
    />
    <h1>
      Contacts list
    </h1>
    <VContactsList :items="contactsItems" />
    <h1>
      Create contact form
    </h1>
    <VCreateContactForm />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { VCreateContactForm, VContactsList, VSearch } from '@/components';

export default {
  name: 'ContactsView',
  components: {
    VCreateContactForm,
    VContactsList,
    VSearch,
  },
  data() {
    return {
      search: {
        data: [],
        isActive: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      contacts: 'getContacts',
    }),
    contactsItems() {
      return (this.search.isActive ? this.search.data : this.contacts.data) || [];
    },
  },
};
</script>
