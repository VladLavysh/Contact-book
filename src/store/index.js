import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        firstName: "Vladislav",
        secondName: "Lavysh",
        phoneNumber: "+48 518 254 052",
        fullName: "Vladislav Lavysh",
        abbr: "VL"
      }
    ],

    customFieldsData: [],

    showAddContact: false
  },

  mutations: {
    createContact(state, newContact) {
      state.contacts.push(newContact);
    },
    deleteContact(state, contactToDelete) {
      state.contacts = state.contacts.filter(
        contact => contact !== contactToDelete
      );
    },

    createField(state, newField) {
      state.customFieldsData.unshift(newField);
      console.log(state.customFieldsData);
    },
    deleteField(state, fieldToDelete) {
      state.customFieldsData = state.customFieldsData.filter(
        field => field !== fieldToDelete
      );
    },

    changeVisibility(state) {
      state.showAddContact = !state.showAddContact;
    }
  },

  actions: {},

  getters: {
    allContacts(state) {
      return state.contacts;
    },
    allFields(state) {
      return state.customFieldsData;
    },
    isShown(state) {
      return state.showAddContact;
    }
  }
});
