export const validation = {
  methods: {
    capitalizeWord(word) {
      return word[0].toUpperCase() + word.substring(1);
    },
    contactAbbr(firstName, secondName) {
      const firstLetter = firstName[0]?.toUpperCase() || "";
      const secondLetter = secondName[0]?.toUpperCase() || "";
      return firstLetter + secondLetter;
    },
    validPhoneNumber(phoneNumber) {
      return ("+" + phoneNumber).match(/.{1,3}/g).join(" ");
    }
  }
};
