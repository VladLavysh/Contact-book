import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        firstName: "Vladislav",
        secondName: "Lavysh",
        phoneNumber: "48518254052",
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
    updateContact(state, newContactData) {
      state.selectedContact = Object.assign(
        state.selectedContact,
        newContactData
      );

      localStorage.setItem("contact-list", JSON.stringify(state.contacts));
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

      state.selectedContact =
        state.selectedContact || state.contacts[contactNum];

      return state.selectedContact;
    }
  }
});
