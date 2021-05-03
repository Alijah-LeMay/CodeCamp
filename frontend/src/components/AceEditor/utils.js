export const stripText = (text) => {
  text
    .toLowerCase()
    // to lowercase
    .replace(/\s+/g, '')
    // remove spaces
    .replace(/(\r\n|\n|\r)/gm, '')
    // remove linebreaks
    .replace(/"/g, "'")
  // switch double quote to single}
  console.log('Text Stripped -', text)
  return text
}
