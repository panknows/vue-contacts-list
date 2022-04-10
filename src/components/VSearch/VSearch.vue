<template>
  <div>
    <b-form-input v-model="request" placeholder="Enter your name" />
    <template v-if="isActive">
      Searching results: «{{ request }}» <br />
      found: {{ value.length }}
      <b-button @click="clear">clear</b-button>
    </template>
  </div>
</template>

<script>
export default {
  name: 'VSearch',
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
