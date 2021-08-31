import moment from 'moment';

const formatDate = (dateStr, formatStr = 'yyyy-MM-DD') => {
  return moment(dateStr).format(formatStr);
};

export {formatDate};
