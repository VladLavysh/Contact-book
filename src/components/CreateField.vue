<!-- Компонент, создающий новое поле контакта -->

<template>
  <div class="card-wrapper">
    <div class="custom-fields input-fields">
      <div class="custom-fields__inputs">
        <input
          v-model.trim="title"
          :class="{ 'input-wrong': !isFormValid && !title }"
          type="text"
          placeholder="Название"
        />
        <input
          v-model.trim="value"
          :class="{ 'input-wrong': !isFormValid && !value }"
          type="text"
          placeholder="Значение"
        />
      </div>

      <div class="custom-fields__buttons">
        <button class="btn-cancel" @click="cancel">Отменить</button>
        <button class="btn-add" @click.prevent="create">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showOptions"],
  data: () => ({
    title: "",
    value: "",

    isFormValid: true
  }),

  methods: {
    cancel() {
      this.$emit("hide-options");
    },

    create() {
      if (!this.title || !this.value) {
        this.isFormValid = false;
        setTimeout(() => (this.isFormValid = true), 2000);
        return;
      }

      const fieldName = "customFieldNr" + Date.now();

      const newField = {
        [fieldName]: { title: this.title, value: this.value }
      };

      this.$emit("create-field", newField);

      this.title = this.value = "";

      this.$emit("hide-options");
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 320px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.custom-fields {
  position: absolute;
  left: -10px;
  bottom: 11%;

  width: 320px;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  background-color: rgba(0, 0, 0, 0.65);

  &__inputs {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .input-wrong {
      border-color: red;

      &::placeholder {
        color: red;
      }
    }

    input {
      width: 155px;
      margin-bottom: 0;
    }
  }

  &__buttons {
    width: 265px;
    display: flex;
    justify-content: space-between;

    button {
      width: 100px;
      height: 25px;

      border: none;
      border-radius: 5px;
      outline: none;

      background-color: #6f96ed;
      color: #fcfeff;
      cursor: pointer;
    }
  }
}
</style>
