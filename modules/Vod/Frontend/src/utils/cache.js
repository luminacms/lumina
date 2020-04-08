import cookies from 'js-cookie'
import storage from 'good-storage'

const LoginStatusKey = 'Login-Status'// 登录态 0 1 2
const TokenKey = 'Access-Token'// token
const UserInfoKey = 'User-Info'// 用户信息 {} {...}

export function loadLoginStatus () {
  return cookies.get(LoginStatusKey) || 0
}

export function saveLoginStatus (status) {
  cookies.set(LoginStatusKey, status, {expires: 7})
  return status
}

export function removeLoginStatus () {
  cookies.remove(LoginStatusKey)
  return ''
}

export function loadToken () {
  return storage.get(TokenKey, '')
}

export function saveToken (token) {
  storage.set(TokenKey, token)
  return token
}

export function removeToken () {
  storage.remove(TokenKey)
  return ''
}

export function loadUserInfo () {
  return storage.get(UserInfoKey, {})
}

export function saveUserInfo (userInfo) {
  storage.set(UserInfoKey, userInfo)
  return userInfo
}

export function removeUserInfo () {
  storage.remove(UserInfoKey)
  return {}
}

export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
