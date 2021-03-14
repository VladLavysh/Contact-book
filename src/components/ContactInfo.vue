<template>
  <div class="contact-card">
    <div class="contacts__header contact-info">
      <router-link to="/">
        <span
          class="material-icons contact-info__icon-back"
          @click="nullifyContact"
        >
          arrow_back_ios_new
        </span>
      </router-link>
      <span class="title">О контакте</span>
    </div>
    <div class="add-contact__main main-info">
      <div
        class="main-info__icon"
        :style="{ 'background-color': selectedContact.iconColor }"
      >
        {{ selectedContact.abbr }}
      </div>
      <form class="main-info__create-form">
        <div class="input-fields">
          <div class="input-fields__field-info">
            <label>Имя</label>
            <input
              :value="selectedContact.firstName"
              type="text"
              placeholder="Имя"
            />
          </div>
          <div class="input-fields__field-info">
            <label>Фамилия</label>
            <input
              :value="selectedContact.secondName"
              type="text"
              placeholder="Фамилия"
            />
          </div>
          <div class="input-fields__field-info">
            <label>Номер телефона</label>
            <input
              :value="selectedContact.phoneNumber"
              type="tel"
              placeholder="Мобильный телефон"
            />
          </div>

          <custom-input />
        </div>

        <span class="input-fields__add-field">добавить поле</span>

        <div class="input-fields__buttons">
          <button class="main-info__submit">Отменить</button>
          <button class="main-info__submit" type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CustomInput from "./CustomInput.vue";

export default {
  components: {
    CustomInput
  },
  computed: {
    ...mapGetters(["selectedContact"])
  },

  methods: {
    ...mapMutations(["nullifyContact"])
  }
};
</script>

<style lang="scss" scoped>
.contact-info {
  padding-right: 25px;

  &__icon-back {
    cursor: pointer;

    &:hover {
      color: rgb(228, 228, 228);
    }
  }
}
.input-fields {
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

  &__add-field {
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
    justify-content: space-between;
  }
}
</style>
