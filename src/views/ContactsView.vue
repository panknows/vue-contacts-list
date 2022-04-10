<template>
  <b-container class="pt-5">
    <b-row cols="1">
      <b-col>
        <b-button
          variant="outline-primary"
          size="lg"
          block
          @click="toggleCreateContactModal"
        >
          Add contact
        </b-button>
      </b-col>
      <b-col class="mt-3">
        <VSearch
          v-model="search.data"
          :items="contacts.data"
          search-by-property="name"
          @active="(val) => search.isActive = val"
        />
      </b-col>
      <b-col class="mt-3">
        <VContactsList :items="contactsItems" />
      </b-col>
    </b-row>
    <b-modal v-model="isModalCreateOpen" hide-footer>
      <VContactForm ref="form" @submit="onSubmitCreateContact">
        <template #footer>
          <div class="mt-4">
            <b-button type="submit" variant="primary">Create</b-button>
            <b-button
              variant="secondary"
              @click="toggleCreateContactModal"
              class="ml-2"
            >
              Cancel
            </b-button>
          </div>
        </template>
      </VContactForm>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  VContactsList,
  VSearch,
  VContactForm,
} from '@/components';

export default {
  name: 'ContactsView',
  components: {
    VContactsList,
    VSearch,
    VContactForm,
  },
  data() {
    return {
      search: {
        data: [],
        isActive: false,
      },
      isModalCreateOpen: false,
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
  methods: {
    ...mapActions({
      add: 'addContact',
    }),
    toggleCreateContactModal() {
      this.isModalCreateOpen = !this.isModalCreateOpen;
    },
    onSubmitCreateContact(form) {
      this.add({ ...form });
      this.$refs.form.reset();

      this.toggleCreateContactModal();
    },
  },
};
</script>
