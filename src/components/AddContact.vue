<template>
  <div class="contact-card">
    <div class="contacts__header">
      <span class="title">Добавить контакт</span>
    </div>
    <div class="add-contact__main main-info">
      <div class="main-info__icon" :style="{ 'background-color': randomColor }">
        {{ contactAbbr(firstName, secondName) || "" }}
      </div>
      <form class="main-info__create-form" @submit.prevent="submit">
        <div class="input-fields">
          <div class="input-fields__field-info">
            <label>Имя</label>
            <input
              v-model.trim="firstName"
              type="text"
              maxlength="25"
              placeholder="Пр. Владислав"
            />
          </div>
          <div class="input-fields__field-info">
            <label>Фамилия</label>
            <input
              v-model.trim="secondName"
              type="text"
              maxlength="25"
              placeholder="Пр. Лавыш"
            />
          </div>
          <div class="input-fields__field-info">
            <label>Номер телефона</label>
            <input
              v-model.trim="phoneNumber"
              type="number"
              placeholder="Пр. 518 254 052"
            />
          </div>
        </div>
        <button
          type="submit"
          class="main-info__submit"
          :class="{
            'main-info__submit-active': isFormValid
          }"
          :disabled="!isFormValid"
        >
          Создать
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { validation } from "../utils.js";

export default {
  mixins: [validation],

  data: () => ({
    firstName: "",
    secondName: "",
    phoneNumber: ""
  }),

  methods: {
    ...mapMutations(["createContact", "changeVisibility"]),

    submit() {
      const newContact = {
        options: { idx: this.allContacts.length, iconColor: this.randomColor },
        firstName: { title: "Имя", value: this.firstName },
        secondName: { title: "Фамилия", value: this.secondName },
        phoneNumber: { title: "Номер телефона", value: this.phoneNumber }
      };

      this.createContact(newContact);

      localStorage.setItem("contact-list", JSON.stringify(this.allContacts));

      this.firstName = this.secondName = this.phoneNumber = "";

      this.changeVisibility();
    }
  },

  computed: {
    ...mapGetters(["allContacts"]),

    randomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    isFormValid() {
      return (
        this.firstName &&
        this.secondName &&
        this.phoneNumber &&
        this.phoneNumber.length > 5
      );
    }
  }
};
</script>

<style lang="scss">
.contact-card {
  margin: 0 auto;
  width: 320px;
  background-color: #daedf1;
}
.main-info {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 15px 10px;
  box-sizing: border-box;

  &__icon {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    font-size: 2.5rem;
    color: #f9f9f9;
    border-radius: 50%;
  }

  &__create-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  &__submit {
    width: 110px;
    height: 35px;

    border: none;
    border-radius: 5px;

    font-size: 1rem;
    background-color: #6f96ed;
    color: #fff;

    opacity: 0.5;
    outline: none;
    transition: all 0.3s;
  }

  &__submit-active {
    opacity: 1;
    cursor: pointer;

    &:hover {
      transition: all 0.3s;
      background-color: #f9f9f9;
      border: 2px solid #6f96ed;
      color: #6f96ed;
    }
  }
}

.input-fields {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  &__field-info {
    width: 100%;
    min-height: 63px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    label {
      margin-left: 25px;
      align-self: flex-start;
      font-size: 0.9rem;
      color: #a1a1a1;
    }
  }

  input {
    width: 85%;
    height: 30px;
    margin-bottom: 10px;
    padding-left: 7px;
    box-sizing: border-box;

    font-size: 1rem;
    background-color: #f9f9f9;
    color: #494848;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;

    &::placeholder {
      transition: all 0.2s;
      font-size: 0.9rem;
      color: rgb(196, 198, 202);
    }
  }
}
</style>
