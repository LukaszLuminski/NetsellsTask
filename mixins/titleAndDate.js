import moment from "moment";

export default {
    filters: {
        formatDate(val) {
          if (val) {
            return moment(String(val)).format("Do MMM YYYY");
          }
        },
      },
      methods: {
        formatTitle (val) {
            return val.charAt(0).toUpperCase() + val.slice(1)
          }
      }
  }