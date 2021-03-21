<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  beforeMount() {
    const contactList = localStorage.getItem("contact-list");
    if (contactList) this.updateContacts(JSON.parse(contactList));
  },

  methods: mapMutations(["updateContacts"])
};
</script>
