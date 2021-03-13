<template>
  <div class="contact">
    <div class="info">
      <div class="info__icon-abbr">
        {{ contact.abbr() }}
      </div>
      <span class="info__name-surname">
        {{ contact.fullName() }}
      </span>
      <span class="info__phone">
        {{ contact.phoneNumber }}
      </span>
    </div>
    <span class="icon-info material-icons" @click.stop="toggleContactOptions">
      more_vert
    </span>
    <div class="contact__options" v-if="showOptions">
      <span class="btn-contact-info">О контакте</span>
      <span class="btn-contact-remove"> Удалить контакт </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "contact",
  props: { contact: Object },
  data: () => ({
    showOptions: false
  }),

  created() {
    window.addEventListener("click", () => (this.showOptions = false));
  },

  methods: {
    toggleContactOptions() {
      this.showOptions = !this.showOptions;
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
    margin-left: 50px;

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

  .info {
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
      background-color: rgb(248, 205, 113);
    }
    &__name-surname {
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
