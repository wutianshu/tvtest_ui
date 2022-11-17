// 去除对象中属性值为空的属性
function cleanObjNullProperty (myObj) {
  let newObj = {}
  for (let key in myObj) {
    if (typeof myObj[key] === 'undefined' || myObj[key] === null) {
      continue
    }
    try {
      if (myObj[key].length !== 0) {
        newObj[key] = myObj[key]
      }
    } catch (err) {
      console.log(err)
      console.log('key=' + key)
      console.log('value=' + myObj[key])
      continue
    }
  }
  return newObj
}

// 将参数对象转换成FormData表单对象
function objectToFormData (object) {
  let formData = new FormData()
  for (let key in object) {
    if (
      typeof object[key] === 'number' ||
      (typeof object[key] === 'string' && object[key].length > 0)
    ) {
      formData.append(key, object[key])
    } else {
      console.log('非法参数' + key + ':' + object[key])
    }
  }
  return formData
}

// 读取本地cookie
function getCookie (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i].trim()
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export default {
  cleanObjNullProperty,
  objectToFormData,
  getCookie
}
