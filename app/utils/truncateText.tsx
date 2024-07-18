export default function truncateText(
  text: any,
  maxLength: number,
  suffix: any
) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + suffix;
  }
}
