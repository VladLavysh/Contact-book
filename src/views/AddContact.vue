<template>
  <div class="add-contact">
    <div class="contacts__header">
      <span class="title">Добавить контакт</span>
    </div>
    <div class="add-contact__main main-info">
      <div class="main-info__icon">{{ abbr || "" }}</div>
      <form class="main-info__create-form">
        <div class="input-fields">
          <input v-model="firstName" type="text" placeholder="Имя" />
          <input v-model="secondName" type="text" placeholder="Фамилия" />
          <input
            v-model="phoneNumber"
            type="tel"
            placeholder="Мобильный телефон"
          />
          <div class="input-fields__add-new-field" @click="addInputField">
            добавить поле
          </div>
        </div>
        <button class="main-info__submit" type="submit">Создать</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    secondName: "",
    phoneNumber: null
  }),
  methods: {
    hideComponent() {
      this.$emit("hide-add-contact");
    },

    addInputField() {
      return `
        <div class="input-fields custom-fields">
          <input type="text" placeholder="Название" />
          <input type="text" placeholder="Значение" />
        </div>
      `;
    }
  },

  computed: {
    abbr() {
      const firstLetter = this.firstName[0]?.toUpperCase() || "";
      const secondLetter = this.secondName[0]?.toUpperCase() || "";

      return firstLetter + secondLetter;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-contact {
  margin: 0 auto;
  width: 320px;
  background-color: #daedf1;

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
      background-color: chocolate;
      color: #f9f9f9;
      border-radius: 50%;
    }

    &__create-form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .input-fields {
      min-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 35px;

      &__add-new-field {
        margin-top: 5px;
        font-size: 1rem;
        color: #6f96ed;
        cursor: pointer;

        &:hover {
          color: #4972ca;
        }
      }

      input {
        width: 80%;
        height: 25px;
        margin-bottom: 10px;
        padding: 2px 5px;

        font-size: 1rem;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;

        &::placeholder {
          font-size: 0.9rem;
          color: rgb(196, 198, 202);
        }
      }
    }

    .custom-fields {
      min-width: 285px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0;

      input {
        width: 125px;
      }
    }

    &__submit {
      width: 110px;
      height: 35px;

      border: none;
      border-radius: 5px;

      font-size: 1rem;
      background-color: #ea853d;
      color: #fff;

      outline: none;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transition: all 0.3s;
        background-color: #f9f9f9;
        border: 2px solid #ea853d;
        color: #ea853d;
      }
    }
  }
}
</style>
