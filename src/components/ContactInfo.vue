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
        {{
          contactAbbr(
            contactInfo.firstName.value,
            contactInfo.secondName.value
          ) || ""
        }}
      </div>
      <form class="main-info__create-form" @submit.prevent="saveChanges">
        <div class="input-fields">
          <div
            class="input-fields__field-info"
            v-for="(_, idx) in contactTitlesLength"
            :key="idx"
            :idx="idx"
          >
            <label>{{ capitalizeWord(contactData[idx].title) }}</label>
            <input type="text" v-model="contactInfo[contactKeys[idx]].value" />
            <span
              class="material-icons input-fields__remove-btn"
              v-if="idx > 2"
              @click="removeField(idx)"
              >clear</span
            >
          </div>
        </div>

        <span class="input-fields__add-field-btn" @click="showOptions = true">
          добавить поле
        </span>

        <div class="input-fields__buttons">
          <button
            type="submit"
            class="main-info__submit main-info__submit-active"
          >
            Сохранить
          </button>
          <button
            class="main-info__submit main-info__submit-active"
            @click.prevent="goBack"
          >
            Назад
          </button>
        </div>
      </form>
      <create-field
        v-if="showOptions"
        @hide-options="showOptions = false"
        @create-field="createField"
      />
      <p class="contact-wrong-msg" v-if="!isFormValid">
        Пожалуйста, введите корректные данные
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { validation } from "../utils.js";
import CreateField from "./CreateField.vue";

export default {
  mixins: [validation],
  components: {
    CreateField
  },

  data: () => ({
    contactInfo: {},
    prevContactState: null,

    showOptions: false,
    isFormValid: true,
    defaultContacts: []
  }),

  beforeMount() {
    this.initState();
  },

  computed: {
    ...mapGetters(["selectedContact", "allContacts"]),

    contactTitlesLength() {
      return Object.keys(this.contactInfo).length;
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
    ...mapMutations(["nullifyContact", "updateContact", "updateContacts"]),

    initState() {
      this.contactKeys.forEach(key => {
        this.contactInfo[key] = this.selectedContact[key];
      });
    },

    saveChanges() {
      let updatedContact = {};

      for (let i = 0; i < this.contactTitlesLength; i++) {
        const contactKey = this.contactKeys[i];
        const contactTitle = this.contactData[i].title;
        const contactValue = this.contactInfo[contactKey].value;

        if (contactValue) {
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

      const idx = this.selectedContact.options.idx;
      this.allContacts[idx] = Object.assign(updatedContact, {
        options: this.selectedContact.options
      });

      localStorage.setItem("contact-list", JSON.stringify(this.allContacts));
      this.$router.push("/");
    },

    goBack() {
      const confirm = window.confirm(
        "Вы уверены что хотите перейти назад?\nИзмененные данные не сохранятся"
      );

      if (confirm) {
        const notEditedContacts = JSON.parse(
          localStorage.getItem("contact-list")
        );
        this.updateContacts(notEditedContacts);
        this.nullifyContact();
        this.$router.push("/");
      } else return;
    },

    // Брать состояние объекта до его изменения (шаг назад)

    createField(newField) {
      this.contactInfo = Object.assign({}, this.contactInfo, newField);

      this.updateContact(this.contactInfo);
    },

    removeField(idx) {
      const confirm = window.confirm("Вы уверены что хотите удалить поле?");

      if (confirm) {
        const prop = this.contactKeys[idx];

        delete this.contactInfo[prop];
        delete this.selectedContact[prop];

        this.contactInfo = Object.assign({}, this.contactInfo);

        this.updateContact(this.contactInfo);
      } else return;
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

  &__buttons {
    width: 95%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  &__remove-btn {
    position: absolute;
    top: 49%;
    right: 0;

    font-size: 1rem;
    color: #8e8d8d;
    cursor: pointer;
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
