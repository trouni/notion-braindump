import { config } from '@/constants'
import store from '@/store'

export default function uploadFile(
  file,
  { onSuccess = () => {}, tags = null, caption = null } = {}
) {
  store.dispatch('setAPILoading', true)
  // https://codepen.io/team/Cloudinary/pen/QgpyOK
  var url = `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/upload`
  var xhr = new XMLHttpRequest()
  var fd = new FormData()
  xhr.open('POST', url, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

  xhr.onreadystatechange = async function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // File uploaded successfully
      var response = await JSON.parse(xhr.responseText)
      return onSuccess(response)
    }
    store.dispatch('setAPILoading', false)
  }

  fd.append('upload_preset', config.cloudinary.uploadPreset)
  if (tags) fd.append('tags', tags)
  if (caption) fd.append('context', `caption=${caption}`)
  fd.append('file', file)
  xhr.send(fd)
}
