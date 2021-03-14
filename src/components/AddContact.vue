<template>
  <div class="contact-card">
    <div class="contacts__header">
      <span class="title">Добавить контакт</span>
    </div>
    <div class="add-contact__main main-info">
      <div class="main-info__icon" :style="{ 'background-color': randomColor }">
        {{ contactAbbr || "" }}
      </div>
      <form class="main-info__create-form" @submit.prevent="submit">
        <div class="input-fields">
          <input
            :class="{ 'input-wrong': !firstName && isWrong }"
            v-model.trim="firstName"
            type="text"
            maxlength="25"
            placeholder="Имя"
          />
          <input
            :class="{ 'input-wrong': !secondName && isWrong }"
            v-model.trim="secondName"
            type="text"
            maxlength="25"
            placeholder="Фамилия"
          />
          <input
            :class="{ 'input-wrong': !phoneNumber && isWrong }"
            v-model.trim="phoneNumber"
            type="number"
            min="100000000"
            max="999999999999"
            placeholder="Мобильный телефон"
          />
        </div>
        <button class="main-info__submit" type="submit">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    firstName: "",
    secondName: "",
    phoneNumber: "",

    isWrong: false
  }),

  methods: {
    ...mapMutations(["createContact", "changeVisibility"]),

    submit() {
      if (this.firstName && this.secondName && this.phoneNumber) {
        const newContact = {
          firstName: this.capitalizeWord(this.firstName),
          secondName: this.capitalizeWord(this.secondName),
          phoneNumber: this.validPhoneNumber,
          abbr: this.contactAbbr,
          iconColor: this.randomColor,
          id: Date.now()
        };

        this.createContact(newContact);

        this.firstName = this.secondName = this.phoneNumber = "";

        this.changeVisibility();
      } else {
        this.isWrong = true;
        setTimeout(() => (this.isWrong = false), 2000);
      }
    },

    capitalizeWord(word) {
      return word[0].toUpperCase() + word.substring(1);
    }
  },

  computed: {
    contactAbbr() {
      const firstLetter = this.firstName[0]?.toUpperCase() || "";
      const secondLetter = this.secondName[0]?.toUpperCase() || "";
      return firstLetter + secondLetter;
    },

    randomColor() {
      return "#" + Math.floor(Math.random() * 16777215).toString(16);
    },

    validPhoneNumber() {
      return "+" + this.phoneNumber.match(/\d{1,3}/g).join(" ");
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

    outline: none;
    cursor: pointer;
    transition: all 0.3s;

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

  &__add-new-field {
    margin-top: 5px;
    font-size: 1rem;
    color: #6f96ed;
    cursor: pointer;

    &:hover {
      color: #4972ca;
    }
  }

  .input-wrong {
    border-color: #df6161;

    &::placeholder {
      transition: all 0.2s;
      color: #df6161;
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
