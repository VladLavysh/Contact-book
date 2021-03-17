<template>
  <div class="contact-card">
    <div class="contacts__header contact-info">
      <span class="title">О контакте</span>
    </div>
    <div class="add-contact__main main-info">
      <div
        class="main-info__icon"
        :style="{ 'background-color': selectedContact.options.iconColor }"
      >
        {{ contactAbbr(contactInfo.firstName, contactInfo.secondName) || "" }}
      </div>
      <form class="main-info__create-form" @submit.prevent="saveChanges">
        <div class="input-fields">
          <div
            class="input-fields__field-info"
            v-for="(_, idx) in contactTitlesLength"
            :key="idx"
            :idx="idx"
          >
            <label>{{ contactData[idx].title }}</label>
            <input type="text" v-model="contactInfo[contactKeys[idx]]" />
          </div>

          <!--<custom-input />-->
        </div>

        <span
          class="input-fields__add-field-btn"
          :class="{ 'input-fields__add-btn-disabled': isFieldAdded }"
          >добавить поле</span
        >

        <div class="input-fields__buttons">
          <button
            type="submit"
            class="main-info__submit main-info__submit-active"
          >
            Сохранить
          </button>
          <router-link to="/">
            <button
              class="main-info__submit main-info__submit-active"
              @click="nullifyContact"
            >
              Отменить
            </button>
          </router-link>
        </div>
      </form>
      <p class="contact-wrong-msg" v-if="!isFormValid">
        Пожалуйста, введите корректные данные
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { validation } from "../utils.js";
//import CustomInput from "./CustomInput.vue";

export default {
  mixins: [validation],
  components: {
    //CustomInput
  },

  data: () => ({
    contactInfo: {},

    isFieldAdded: false,
    isFormValid: true
  }),

  beforeMount() {
    this.initState();
  },

  computed: {
    ...mapGetters(["selectedContact", "allContacts"]),

    contactTitlesLength() {
      return Object.keys(this.selectedContact).length - 1;
    },

    contactKeys() {
      const allKeys = Object.keys(this.selectedContact);
      return allKeys.filter(key => key !== "options");
    },

    contactData() {
      return this.contactKeys.map(key => this.selectedContact[key]);
    }
  },

  methods: {
    ...mapMutations(["nullifyContact", "updateContact"]),

    initState() {
      this.contactKeys.forEach(key => {
        this.contactInfo[key] = this.selectedContact[key].value;
      });
    },

    saveChanges() {
      let updatedContact = {};

      for (let i = 0; i < this.contactTitlesLength; i++) {
        const contactKey = this.contactKeys[i];
        const contactTitle = this.contactData[i].title;
        const contactValue = this.contactInfo[contactKey];

        if (contactValue.length) {
          this.isFormValid = true;
        } else {
          this.isFormValid = false;
          return;
        }

        updatedContact[contactKey] = {
          title: contactTitle,
          value: contactValue
        };
      }

      this.$router.push("/");

      //console.log(this.contactInfo);

      this.updateContact(updatedContact);
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-info {
  padding-right: 25px;
}

.input-fields {
  &__add-field-btn {
    margin-bottom: 30px;
    cursor: pointer;
    color: #6f96ed;

    &:hover {
      color: #526fad;
    }
  }

  &__add-btn-disabled {
    pointer-events: none;
    cursor: default;
    color: #a7bff3;
  }

  &__buttons {
    width: 95%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
}

.contact-wrong-msg {
  position: absolute;
  bottom: -65px;
  width: 100%;

  padding: 5px;
  box-sizing: border-box;

  text-align: center;
  background-color: tomato;
  color: white;
}
</style>
