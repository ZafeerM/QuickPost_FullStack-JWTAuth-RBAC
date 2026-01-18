const { format } = require("date-fns");

const formatDate = () => {
  return format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
};

module.exports = formatDate;
