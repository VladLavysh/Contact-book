<template>
  <div :class="{ wrapper: showAddContact }">
    <add-contact v-if="showAddContact" />
    <all-contacts
      :isAddContactShown="showAddContact"
      @toggle-component="showAddContact = !showAddContact"
    />
  </div>
</template>

<script>
import AllContacts from "../views/AllContacts.vue";
import AddContact from "../views/AddContact.vue";

export default {
  components: {
    AllContacts,
    AddContact
  },

  data: () => ({
    showAddContact: false
  })
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
