import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'eyJVc2VyTmFtZSI6ImNhc3VuIiwiRXhwaXJlVGltZSI6IjYxMDMtMDctMTJUMTI6MTY6MTEuNDc2NDkwNiswODowMCJ9.SsykSwN6Lea2uMYB1EzqXQvs4HlkSUxJmfUXljFdaZs='

export function getToken () {
  // console.log('查看token',TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
