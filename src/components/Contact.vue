<!-- Компонент, генерирующий контакт -->

<template>
  <div class="contact">
    <div class="contact-info">
      <div
        class="contact-info__icon-abbr"
        :style="{ 'background-color': contact.options.iconColor }"
      >
        {{ contactAbbr(contact.firstName.value, contact.secondName.value) }}
      </div>
      <span class="contact-info__full-name">
        {{ contactFullName }}
      </span>
      <span class="contact-info__phone">
        {{ validPhoneNumber(contact.phoneNumber.value) }}
      </span>
    </div>
    <span class="icon-info material-icons" @click.stop="toggleContactOptions">
      more_vert
    </span>
    <div class="contact__options" v-if="showOptions">
      <router-link :to="'/contact/' + contact.options.idx">
        <span
          class="btn-contact-info"
          @click="selectContact(contact.options.idx)"
        >
          О контакте
        </span>
      </router-link>

      <span class="btn-contact-remove" @click="removeContact(contact)">
        Удалить контакт
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { validation } from "../utils.js";

export default {
  name: "contact",
  props: { contact: Object },
  mixins: [validation],

  data: () => ({
    showOptions: false
  }),

  created() {
    window.addEventListener("click", () => (this.showOptions = false));
  },

  computed: {
    ...mapGetters(["allContacts"]),

    contactFullName() {
      return (
        this.capitalizeWord(this.contact.firstName.value) +
        " " +
        this.capitalizeWord(this.contact.secondName.value)
      );
    }
  },

  methods: {
    ...mapMutations(["deleteContact", "selectContact"]),

    toggleContactOptions() {
      this.showOptions = !this.showOptions;
    },

    removeContact(contactToDelete) {
      const confirm = window.confirm("Вы уверены что хотите удалить контакт?");

      if (!confirm) return;

      this.deleteContact(contactToDelete);
      localStorage.setItem("contact-list", JSON.stringify(this.allContacts));
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  min-height: 40px;
  margin: 10px 0;

  transition: all 0.2s;
  transform: scale(1);

  &:hover {
    transition: all 0.2s;
    transform: scale(1.015);
  }

  .icon-info {
    color: #777777;
    cursor: pointer;
    user-select: none;

    &:hover {
      color: rgb(145, 145, 145);
    }
  }

  &__options {
    height: 40px;
    position: absolute;
    right: -170px;
    padding: 5px 10px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-radius: 5px;
    background-color: #6f96ed;
    color: #fff;

    span {
      cursor: pointer;
    }

    .btn-contact-info {
      &:hover {
        color: rgb(226, 212, 86);
      }
    }

    .btn-contact-remove {
      &:hover {
        color: rgb(228, 161, 161);
      }
    }
  }

  .contact-info {
    display: flex;
    align-items: center;

    &__icon-abbr {
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 30px;
      border-radius: 50%;
      color: #fff;
    }
    &__full-name {
      width: 200px;
      margin-right: 5px;

      font-size: 1.1rem;
      overflow-x: hidden;
    }
    &__phone {
      color: #777373;
    }
  }
}
</style>
