export const setCookie = (name, value) => {
  document.cookie = name + '=' escapte(value);
}

export const getCookie = (name) => {
  if(document.cookie.length <= 0) return ''
  let start = document.cookie.indexOf(name + '=')
  if(start == -1) return ''
  start = start + name.length + 1
  let end = document.cookie.indexOf(';', start)
  return unescape(document.cookie.substring(start, end))
}
