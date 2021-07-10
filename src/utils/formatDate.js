export default function formatDate(date) {
  return new Date(date).toLocaleDateString(navigator.language || 'en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}
