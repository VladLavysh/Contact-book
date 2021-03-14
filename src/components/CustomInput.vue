<template>
  <div class="custom-fields input-fields">
    <input v-model="title" type="text" placeholder="Название" />
    <input v-model="value" type="text" placeholder="Значение" />
    <span
      class="material-icons custom-fields__icon"
      @click="showOptions = !showOptions"
    >
      more_vert
    </span>
    <div
      class="field-options"
      :class="{ 'field-options-top-1': !showCreateBtn }"
      v-if="showOptions"
    >
      <span
        class="btn field-options__add-button"
        v-if="showCreateBtn"
        @click="create"
      >
        Создать поле
      </span>
      <span class="btn field-options__delete-button" @click="handleDelete">
        Удалить поле
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    title: "",
    value: "",
    showOptions: false,
    showCreateBtn: true
  }),

  methods: {
    ...mapMutations(["createField", "deleteField"]),
    create() {
      this.createField(this.fieldData);
      this.showCreateBtn = this.showOptions = false;

      this.$emit("field-created");
    },
    handleDelete() {
      this.deleteField(this.fieldData);
      this.showOptions = false;
    }
  },

  computed: {
    fieldData() {
      return { title: this.title, value: this.value };
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-fields {
  min-width: 285px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0;

  &__icon {
    position: absolute;
    top: 8px;
    right: -17px;

    font-size: 1.1rem;
    color: #777777;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: rgb(145, 145, 145);
    }
  }

  .field-options {
    //min-height: 40px;
    position: absolute;
    top: -8px;
    right: -145px;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    background-color: #6f96ed;

    .btn {
      color: #fff;
      cursor: pointer;
    }

    &__add-button {
      &:hover {
        color: rgb(99, 236, 133);
      }
    }

    &__delete-button {
      &:hover {
        color: rgb(233, 120, 120);
      }
    }
  }

  .field-options-top-1 {
    top: 1px;
  }

  input {
    width: 140px;
  }
}
</style>
