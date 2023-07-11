import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'eyJVc2VyTmFtZSI6ImNhc3VuIiwiRXhwaXJlVGltZSI6IjYxMDMtMDctMTJUMTI6MTY6MTEuNDc2NDkwNiswODowMCJ9.SsykSwN6Lea2uMYB1EzqXQvs4HlkSUxJmfUXljFdaZs='
const routerRoles = []
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
export function getRouterRoles () {
  // console.log('查看token',TokenKey)
  return Cookies.get(routerRoles)
}

export function setRouterRoles (roles) {
  console.log(roles,'保存了')
  return Cookies.set(routerRoles, roles)
}

export function removeRouterRoles() {
  return Cookies.remove(routerRoles)
}
