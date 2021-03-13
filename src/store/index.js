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
        fullName() {
          return `${this.firstName} ${this.secondName}`;
        },
        abbr() {
          return this.firstName[0] + this.secondName[0];
        }
      },
      {
        firstName: "Andrey",
        secondName: "McDowson",
        phoneNumber: "+51 (14) 240 525",
        fullName() {
          return `${this.firstName} ${this.secondName}`;
        },
        abbr() {
          return this.firstName[0] + this.secondName[0];
        }
      },
      {
        firstName: "Mike",
        secondName: "Kellinger",
        phoneNumber: "+98 875 214 638",
        fullName() {
          return `${this.firstName} ${this.secondName}`;
        },
        abbr() {
          return this.firstName[0] + this.secondName[0];
        }
      }
    ]
  },
  mutations: {
    deleteContact(state, contactToDelete) {
      state.contacts = state.contacts.filter(
        contact => contact !== contactToDelete
      );
    }
  },
  actions: {},
  getters: {
    allContacts(state) {
      return state.contacts;
    }
  }
});
