import moment from 'moment';

const formatDate = (dateStr, formatStr = 'yyyy-MM-dd') => {
  return moment(dateStr).format(formatStr);
};

export {formatDate};
