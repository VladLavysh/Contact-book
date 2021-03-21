<!-- Главная страница приложения -->

<template>
  <div :class="{ wrapper: isShown }">
    <add-contact v-if="isShown" />
    <all-contacts />
  </div>
</template>

<script>
import AllContacts from "../components/AllContacts.vue";
import AddContact from "../components/AddContact.vue";
import { mapGetters } from "vuex";

export default {
  name: "main-layout",
  components: {
    AllContacts,
    AddContact
  },

  computed: mapGetters(["isShown"])
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: auto;

  .contacts,
  .add-contact {
    margin: 0;
  }
}
</style>
