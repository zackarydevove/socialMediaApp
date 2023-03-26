// Date format for the Main tweet in a thread
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  
    const time = timeFormatter.format(date);
    const formattedDate = dateFormatter.format(date);
  
    return `${time} · ${formattedDate}`;
  }