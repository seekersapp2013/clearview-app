export default function getRowColor (index) {
  const evenColor = 'rgba(58,97,104,0.15)'
  const oddColor = '#fffcf7'
  const backgroundColor = (index % 2 !== 0)
    ? oddColor
    : evenColor

  return (backgroundColor)
}
