export default function formatDateTime(date) {
  return new Date(date).toLocaleTimeString(navigator.language || 'en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
