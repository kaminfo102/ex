import moment from 'jalali-moment';

export const formatJalaliDate = (date: string) => {
  return moment(date).locale('fa').format('jYYYY/jMM/jDD');
};

export const formatJalaliDateTime = (date: string) => {
  return moment(date).locale('fa').format('jYYYY/jMM/jDD HH:mm');
};