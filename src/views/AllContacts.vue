<template>
  <div class="contacts">
    <div class="contacts__header">
      <span class="title">Контакты</span>
      <span class="icon material-icons" @click="toggleAddContact">
        {{ currentIcon }}
      </span>
    </div>
    <div class="contacts__main">
      <div v-if="allContacts.length">
        <contact
          v-for="contact of allContacts"
          :key="contact.phoneNumber"
          :contact="contact"
        />
      </div>
      <div v-else class="contacts__warn">
        Пока что здесь нет контактов, добавьте первый
      </div>
    </div>
  </div>
</template>

<script>
import Contact from "../components/Contact.vue";
import { mapGetters } from "vuex";

export default {
  name: "all-contacts",
  components: { Contact },

  props: {
    isAddContactShown: Boolean
  },

  data: () => ({}),

  computed: {
    ...mapGetters(["allContacts"]),

    currentIcon() {
      return this.isAddContactShown
        ? "person_remove_alt_1"
        : "person_add_alt_1";
    }
  },

  methods: {
    toggleAddContact() {
      this.$emit("toggle-component");
    }

    //removeContact(contactToRemove) {
    //  this.contacts = this.contacts.filter(
    //    contact => contact.name !== contactToRemove.name
    //  );
    //}
  }
};
</script>

<style lang="scss">
.contacts {
  width: 500px;
  margin: auto;

  &__header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 10px 15px;

    background-color: #6f96ed;

    span {
      color: #fff;
    }

    .title {
      font-size: 1.4rem;
    }

    .icon {
      font-size: 2.4rem;
      transform: scaleX(-1);
      cursor: pointer;
      user-select: none;

      &:hover {
        color: rgb(240, 240, 240);
      }
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 50px;
    padding: 5px 15px;

    box-sizing: border-box;
    border-radius: 5px;
    background-color: #daedf1;
  }
  &__warn {
    margin: auto;
  }
}
</style>
