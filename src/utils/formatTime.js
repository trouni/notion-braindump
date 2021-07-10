export default function formatTime(date) {
  return new Date(date).toLocaleTimeString(navigator.language || 'en-GB', {
    minute: '2-digit',
    hour: '2-digit',
  })
}
