export const getExtension = (fileName: string): string => {
  const i = fileName.lastIndexOf('.')
  if (i === -1) {
    throw new Error('file`s name is broken')
  }
  return fileName.slice(i + 1).toLowerCase()
}


export const reduceImage = async (file, maxSize, callback) => {
  let reader = new FileReader()

  reader.onload = function(event) {
    let image = new Image()
    image.src = event.target.result as string

    image.onload = function() {
      let width = image.width
      let height = image.height

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height
          height = maxSize
        }
      }

      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, width, height)

      canvas.toBlob(function(blob) {
        callback(blob)
      }, file.type)
    }
  }

  reader.readAsDataURL(file)
}
