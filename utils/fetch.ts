// 统一的错误处理函数
function handleError(status) {
  let errMsg = ''
  switch (status) {
    case 404:
      errMsg = '请求地址不存在'
      break
    case 500:
      errMsg = '服务器错误'
      break
    default:
      errMsg = '请求错误'
      break
  }
  throw errMsg
}
