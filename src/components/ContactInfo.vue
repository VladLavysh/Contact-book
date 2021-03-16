<template>
  <div class="contact-card">
    <div class="contacts__header contact-info">
      <span class="title">О контакте</span>
    </div>
    <div class="add-contact__main main-info">
      <div
        class="main-info__icon"
        :style="{ 'background-color': selectedContact.iconColor }"
      >
        {{ contactAbbr(firstName, secondName) }}
      </div>
      <form class="main-info__create-form" @submit.prevent="saveChanges">
        <div class="input-fields">
          <div class="input-fields__field-info">
            <label>Имя</label>
            <input v-model="firstName" type="text" placeholder="Имя" />
          </div>
          <div class="input-fields__field-info">
            <label>Фамилия</label>
            <input v-model="secondName" type="text" placeholder="Фамилия" />
          </div>
          <div class="input-fields__field-info">
            <label>Номер телефона</label>
            <input
              v-model.trim="phoneNumber"
              type="number"
              placeholder="Мобильный телефон"
            />
          </div>

          <custom-input />
        </div>

        <span
          class="input-fields__add-field-btn"
          :class="{ 'input-fields__add-btn-disabled': isFieldAdded }"
          >добавить поле</span
        >

        <div class="input-fields__buttons">
          <button class="main-info__submit" type="submit">Сохранить</button>
          <router-link to="/">
            <button class="main-info__submit" @click="nullifyContact">
              Отменить
            </button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { validation } from "../utils.js";
import CustomInput from "./CustomInput.vue";

export default {
  mixins: [validation],
  components: {
    CustomInput
  },

  data: () => ({
    firstName: "",
    secondName: "",
    phoneNumber: "",

    isFieldAdded: false
  }),

  mounted() {
    setTimeout(() => {
      // ---------- redo ---------- //
      this.firstName = this.selectedContact.firstName;
      this.secondName = this.selectedContact.secondName;
      this.phoneNumber = this.selectedContact.phoneNumber;
    }, 0);
  },

  computed: {
    ...mapGetters(["selectedContact"])
  },

  methods: {
    ...mapMutations(["nullifyContact", "updateContact"]),

    saveChanges() {
      this.$router.push("/");

      this.updateContact({
        firstName: this.capitalizeWord(this.firstName),
        secondName: this.capitalizeWord(this.secondName),
        phoneNumber: this.phoneNumber
      });
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
</style>
