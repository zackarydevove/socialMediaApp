export const joinedDate = (dateString) => {
  console.log('dateString:', dateString);
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const formattedDate = formatter.format(date);
  return formattedDate;
};