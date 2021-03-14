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
        abbr: "VL",
        iconColor: "#f5bd48",
        idx: 0
      }
    ],

    customFieldsData: [],

    selectedContact: null,

    showAddContact: false
  },

  mutations: {
    updateContacts(state, contactsFromLs) {
      state.contacts = contactsFromLs;
    },

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
    },

    selectContact(state, contactIdx) {
      state.selectedContact = state.contacts.find(
        contact => contact.idx === contactIdx
      );
    },
    nullifyContact(state) {
      state.selectedContact = null;
    }
  },

  getters: {
    allContacts(state) {
      return state.contacts;
    },
    allFields(state) {
      return state.customFieldsData;
    },
    isShown(state) {
      return state.showAddContact;
    },
    selectedContact(state) {
      const contactNum = window.location.pathname.match(/\d+/)?.join("");

      console.log(contactNum);

      return state.selectedContact || state.contacts[contactNum];
      //return state.contacts[0]; // --- !!! ---
    }
  }
});
