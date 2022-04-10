<template>
  <b-container class="pt-5">
    <b-row align-h="between">
      <b-col cols="auto">
        <b-button variant="outline-primary" @click="$router.go(-1)">
          <BIconArrowLeft /> Back
        </b-button>
      </b-col>
      <b-col cols="auto">
        <b-button variant="outline-primary" @click="toggleEditMode">
          Edit
        </b-button>
        <b-button class="ml-3" variant="outline-danger" @click="deleteContact">Delete</b-button>
      </b-col>
    </b-row>
    <b-row v-if="contactData" align-v="center" class="mt-5">
      <b-col cols="auto">
        <b-avatar variant="primary" :text="contactData.name[0]" size="150"></b-avatar>
      </b-col>
      <b-col>
        <h2>
          {{ contactData.name }}
        </h2>
      </b-col>
    </b-row>
    <b-list-group
      v-if="contactData.phones.length"
      class="mt-4"
    >
      <b-list-group-item
        v-for="(item) in contactData.phones"
        :key="item.id"
        :href="`tel:${item.value}`"
        class="d-flex align-items-center border-right-0 border-left-0"
      >
        <BIconTelephone style="width: 30px; height: 30px;" class="mr-3" />
        {{ item.value }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group
      v-if="contactData.emails.length"
      class="mt-4"
    >
      <b-list-group-item
        v-for="(item) in contactData.emails"
        :key="item.id"
        :href="`mailto:${item.value}`"
        class="d-flex align-items-center border-right-0 border-left-0"
      >
        <BIconEnvelope style="width: 30px; height: 30px;" class="mr-3" />
        {{ item.value }}
      </b-list-group-item>
    </b-list-group>
    <b-list-group
      v-if="contactData.addresses.length"
      class="mt-4"
    >
      <b-list-group-item
        v-for="(item) in contactData.addresses"
        :key="item.id"
        class="d-flex align-items-center border-right-0 border-left-0"
      >
        <BIconBuilding style="width: 30px; height: 30px;" class="mr-3" />
        {{ item.value }}
      </b-list-group-item>
    </b-list-group>
    <template v-if="isEditMode">
      <b-modal v-model="isEditMode" hide-footer>
        <VContactForm ref="editForm" :initial-values="editForm" @submit="onEditSubmit">
          <template #footer>
            <div class="mt-4">
              <b-button type="submit" variant="primary">Edit</b-button>
              <b-button
                variant="secondary"
                @click="toggleEditMode"
                class="ml-2"
              >
                Cancel
              </b-button>
            </div>
          </template>
        </VContactForm>
      </b-modal>
    </template>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {
  BIconArrowLeft,
  BIconTelephone,
  BIconEnvelope,
  BIconBuilding,
} from 'bootstrap-vue';

import { VContactForm } from '@/components';

import store from '@/store';

export default {
  name: 'ContactView',
  beforeRouteEnter(to, from, next) {
    const contacts = store.getters.getContacts?.data;
    const id = Number(to.params?.id);

    if (contacts.some((item) => {
      const contactId = item.id;

      return !Number.isNaN(id) && contactId === id;
    })) {
      next();
    } else {
      next({ name: 'index' });
    }
  },
  components: {
    VContactForm,
    BIconArrowLeft,
    BIconTelephone,
    BIconEnvelope,
    BIconBuilding,
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
