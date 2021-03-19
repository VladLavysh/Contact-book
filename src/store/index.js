import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [
      {
        options: { idx: 0, iconColor: "#f5bd48" },
        firstName: { title: "Имя", value: "Vladislav" },
        secondName: { title: "Фамилия", value: "Lavysh" },
        phoneNumber: { title: "Номер телефона", value: "48518254052" },
        email: { title: "Email", value: "lavyshvlad1@gmail.com" }
      }
    ],

    selectedContact: null,

    showAddContact: false
  },

  mutations: {
    updateContacts(state, updatedContacts) {
      state.contacts = updatedContacts;
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
        {},
        state.selectedContact,
        newContactData
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
      setTimeout(() => {
        state.selectedContact = null;
      }, 0);
    }
  },

  getters: {
    allContacts(state) {
      return state.contacts;
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
