<template>
  <div>
    <b-button @click="$router.go(-1)">Back</b-button>
    <b-button @click="deleteContact">Delete</b-button>
    <b-button @click="toggleEditMode">Edit</b-button>
    <pre>
      {{ contactData }}
    </pre>
    <template v-if="isEditMode">
      form: {{ editForm }}
      <VContactForm ref="editForm" :initial-values="editForm" @submit="onEditSubmit" />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { VContactForm } from '@/components';

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
  components: {
    VContactForm,
  },
  data() {
    return {
      isEditMode: false,
      editForm: null,
    };
  },
  computed: {
    ...mapGetters(['getContact']),
    contactData() {
      const id = Number(this.$route.params?.id);

      if (id) {
        return this.getContact(id);
      }

      return undefined;
    },
  },
  watch: {
    isEditMode(val) {
      if (!val) {
        this.editForm = null;
        return;
      }

      const formData = {};

      // I would use lodash cloneDeep method
      // const formData = _cloneDeep(this.contactData);

      const cloneEmails = this.contactData.emails.map((item) => ({ ...item }));
      const clonePhones = this.contactData.phones.map((item) => ({ ...item }));
      const cloneAddresses = this.contactData.addresses.map((item) => ({ ...item }));

      formData.phones = [...clonePhones];
      formData.emails = [...cloneEmails];
      formData.addresses = [...cloneAddresses];
      formData.name = this.contactData.name;

      this.editForm = formData;
    },
  },
  methods: {
    ...mapActions({
      deleteContactAction: 'deleteContact',
      editContactAction: 'editContact',
    }),
    deleteContact() {
      const id = this.contactData?.id;

      if (id) {
        this.deleteContactAction(id);

        this.$router.replace({ name: 'index' });
      }
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    onEditSubmit(form) {
      this.editContactAction({ ...form, id: this.contactData.id });

      this.$refs.editForm.reset();

      this.toggleEditMode();
    },
  },
};
</script>
