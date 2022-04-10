import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function clearFields(data) {
  const emails = data.emails.filter((item) => Boolean(item.value));
  const phones = data.phones.filter((item) => Boolean(item.value));
  const addresses = data.addresses.filter((item) => Boolean(item.value));

  return {
    emails,
    phones,
    addresses,
  };
}

export default new Vuex.Store({
  state: {
    contacts: {
      data: [],
      currentId: 1,
    },
  },
  getters: {
    getContacts: (state) => state.contacts,
    getContact: (state) => (id) => state.contacts.data.find((item) => item.id === id),
  },
  mutations: {
    ADD_CONTACT: (state, data) => {
      state.contacts.data = [...state.contacts.data, data];
      state.contacts.currentId += 1;
    },
    DELETE_CONTACT: (state, id) => {
      state.contacts.data = state.contacts.data.filter((item) => item.id !== id);
    },
    EDIT_CONTACT: (state, data) => {
      const index = state.contacts.data.findIndex((item) => item.id === data.id);
      const contactsData = [...state.contacts.data];

      if (contactsData[index]) {
        contactsData[index] = { ...data };
      }

      Vue.set(state, 'contacts', { ...state.contacts, data: [...contactsData] });
    },
  },
  actions: {
    addContact({ commit, state }, data) {
      const id = state.contacts.currentId;
      const fields = clearFields(data);

      commit('ADD_CONTACT', {
        id, ...data, ...fields,
      });
    },
    editContact({ commit }, newContact) {
      const id = newContact?.id;

      if (id) {
        const fields = clearFields(newContact);

        commit('EDIT_CONTACT', { ...newContact, ...fields });
      }
    },
    deleteContact({ commit }, id) {
      if (id) {
        commit('DELETE_CONTACT', id);
      }
    },
  },
});
