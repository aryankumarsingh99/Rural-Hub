// src/lib/dateUtils.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  return `${day} ${month} ${year} at ${time}`;
};

// Alternative format: "15 January 2024"
export const formatDateUK = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};