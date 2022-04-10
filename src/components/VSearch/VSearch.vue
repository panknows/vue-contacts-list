<template>
  <div>
    <b-form-input
      v-model="request"
      placeholder="Search by name"
      type="search"
      debounce="200"
      size="lg"
    />
    <div v-if="isActive" class="mt-2">
      <div>
        <h5>
          Searching results: «{{ request }}»
        </h5>
      </div>
      <div class="mt-2 d-flex align-items-center">
        Found: {{ value.length }}
        <b-button pill variant="outline-danger" size="sm" class="ml-2" @click="clear">
          <BIconX />
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconX } from 'bootstrap-vue';

export default {
  name: 'VSearch',
  components: {
    BIconX,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    searchByProperty: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      request: '',
    };
  },
  mounted() {
    const query = this.$route.query?.search;

    if (query) {
      this.request = query;
    }
  },
  watch: {
    request(val) {
      this.search();

      const query = this.$route.query?.search;
      const value = val.trim();

      if (value !== query) {
        this.$router.replace({ ...this.$route, query: { search: value } });
      }
    },
    isActive(val) {
      this.$emit('active', val);
    },
  },
  computed: {
    isActive() {
      return Boolean(this.request);
    },
  },
  methods: {
    search() {
      const requestString = this.request.trim().toLowerCase();

      if (requestString !== '') {
        const result = this.items.filter((item) => {
          const itemString = (
            this.searchByProperty ? item[this.searchByProperty] : item
          ).toLowerCase();

          return itemString.includes(requestString || null);
        });

        this.$emit('input', result);
      }
    },
    clear() {
      this.request = '';
    },
  },
};
</script>
