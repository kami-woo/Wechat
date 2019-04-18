import data from './emoji-data.js'
let emojiData = {}
Object.values(data).forEach(item => {
  emojiData = { ...emojiData, ...item }
})

export function emoji (value) {
  if (!value) return
  Object.keys(emojiData).forEach(item => {
    value = value.replace(new RegExp(item, 'g'), createIcon(item))
  })
  return value
}

function createIcon (item) {
  const value = emojiData[item]
  const path = '/static/emoji/'
  return `<img class="emoji-show" src=${path}${value} width="20px" height="20px"
    style="display: inline-block;margin: -2px 1px 0 1px;vertical-align: middle;">`
}

  // .emoji-show {
  //   display: inline-block;
  //   margin: -2px 1px 0 1px;
  //   vertical-align: middle;
  //   border: 1px solid blue;
  // }