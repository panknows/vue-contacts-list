<template>
  <b-form @submit.prevent="onSubmit">
    <div>
      <b-form-group label="Name:" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          autofocus
          placeholder="Enter name"
          required
        />
      </b-form-group>
    </div>
    <div class="border-bottom mb-2 border-primary">
      <b-form-group
        v-for="(item, i) in form.phones"
        :key="i"
        label="Phone:"
        label-for="phone"
      >
        <b-form-input
          id="phone"
          v-model="item.value"
          placeholder="Enter phone"
          @input="onPhoneInput(item)"
        />
        <b-button
          v-if="form.phones.length > 1 && (i + 1) !== form.phones.length"
          variant="outline-danger"
          size="sm"
          class="mt-2"
          @click="removeField(item)"
        >
          <BIconX /> Remove field
        </b-button>
      </b-form-group>
    </div>
    <div class="border-bottom mb-2 border-primary">
      <b-form-group
        v-for="(item, i) in form.emails"
        :key="i"
        label="Email:"
        :label-for="`email-${i}`"
      >
        <b-form-input
          :id="`email-${i}`"
          type="email"
          v-model="item.value"
          placeholder="Enter email"
          @input="onEmailInput(item)"
        />
        <b-button
          v-if="form.emails.length > 1 && (i + 1) !== form.emails.length"
          variant="outline-danger"
          size="sm"
          class="mt-2"
          @click="removeField(item)"
        >
          <BIconX /> Remove field
        </b-button>
      </b-form-group>
    </div>
    <div>
      <b-form-group
        v-for="(item, i) in form.addresses"
        :key="i"
        label="Address:"
        :label-for="`address-${i}`"
      >
        <b-form-input
          :id="`address-${i}`"
          v-model="item.value"
          placeholder="Enter address"
          @input="onAddressInput(item)"
        />
        <b-button
          v-if="form.addresses.length > 1 && (i + 1) !== form.addresses.length"
          variant="outline-danger"
          size="sm"
          class="mt-2"
          @click="removeField(item)"
        >
          <BIconX /> Remove field
        </b-button>
      </b-form-group>
    </div>
    <slot name="footer">
      <b-button type="submit" variant="primary">Submit</b-button>
    </slot>
  </b-form>
</template>

<script>
import { BIconX } from 'bootstrap-vue';

import { getField, TYPES } from '@/shared/field';

const initialForm = {
  name: null,
  phones: [],
  emails: [],
  addresses: [],
};

export default {
  name: 'VContactForm',
  components: {
    BIconX,
  },
  props: {
    initialValues: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      form: { ...initialForm, ...this.initialValues },
    };
  },
  mounted() {
    this.initFields();
  },
  methods: {
    onSubmit() {
      this.$emit('submit', { ...this.form });
    },
    reset() {
      this.form = { ...initialForm };
    },
    addField(fields) {
      const field = getField(fields);

      switch (field.type) {
        case TYPES.phone:
          this.form.phones = [...this.form.phones, { ...field }];
          break;
        case TYPES.address:
          this.form.addresses = [...this.form.addresses, { ...field }];
          break;
        case TYPES.email:
          this.form.emails = [...this.form.emails, { ...field }];
          break;
        default:
          break;
      }
    },
    initFields() {
      const phoneField = getField(this.form.phones || [], TYPES.phone);
      const emailField = getField(this.form.emails || [], TYPES.email);
      const addressField = getField(this.form.addresses || [], TYPES.address);

      this.form.phones = [...this.form.phones, { ...phoneField }];
      this.form.addresses = [...this.form.addresses, { ...addressField }];
      this.form.emails = [...this.form.emails, { ...emailField }];
    },

    onPhoneInput(field) {
      if (field.id !== this.form.phones[this.form.phones.length - 1].id) return;

      this.addField(this.form.phones);
    },
    onEmailInput(field) {
      if (field.id !== this.form.emails[this.form.emails.length - 1].id) return;

      this.addField(this.form.emails);
    },
    onAddressInput(field) {
      if (field.id !== this.form.addresses[this.form.addresses.length - 1].id) return;

      this.addField(this.form.addresses);
    },

    removeField({ id, type }) {
      switch (type) {
        case TYPES.phone: {
          const newList = this.form.phones.filter((item) => item.id !== id);
          this.form = { ...this.form, phones: [...newList] };
          break;
        }
        case TYPES.email: {
          const newList = this.form.emails.filter((item) => item.id !== id);
          this.form = { ...this.form, emails: [...newList] };
          break;
        }
        case TYPES.address: {
          const newList = this.form.addresses.filter((item) => item.id !== id);
          this.form = { ...this.form, addresses: [...newList] };
          break;
        }
        default:
          break;
      }
    },
  },
};
</script>
