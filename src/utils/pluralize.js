export default function pluralize(
  qty,
  singularWord,
  pluralWord = singularWord + 's'
) {
  return `${qty} ${qty === 1 ? singularWord : pluralWord}`
}
