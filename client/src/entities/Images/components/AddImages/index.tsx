import React from 'react'

import { MdAddAPhoto } from "react-icons/md"
import { ImSpinner9 } from "react-icons/im"

import {getExtension, reduceImage, useGetWidth} from '../../../../shared'


import classes from './AddImages.module.sass'

interface IProps {
  currentImages?: string[]
  setCurrentImages: (value: (((prevState: string[]) => string[]) | string[])) => void
  images: any[]
  setImages: (value: (((prevState: any[]) => any[]) | any[])) => void
  authorId: string
  message: string
  isLoading: boolean

  setMessage(text: string): void

  setAlertMessage(text: string): void
}


const AddImages: React.FC<IProps> = React.memo(({
                                                  currentImages,
                                                  setCurrentImages,
                                                  images,
                                                  setImages,
                                                  authorId,
                                                  message,
                                                  isLoading,
                                                  setMessage,
                                                  setAlertMessage,
                                                }) => {

  const id = React.useId()
  const width = useGetWidth('.images_label')

  const getImagesString = () => {
    if (!currentImages) return ''
    if (currentImages.length > 5) return ''
    return currentImages.join(', ')
  }


  const handleFileUpload = async (event) => {
    if (images.length > 0) {
      setImages([])
    }
    const files = [...event.target.files]
    if (files.length > 5) {
      setCurrentImages([])
      event.target.value = ''
      setMessage('Select no more than 5 files!')
    } else if (message) {
      setMessage('')
    }
    const imagesName = []
    for (const file of files) {
      const index = files.indexOf(file)
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const maxSize = 900
        imagesName.push(file.name)

        await reduceImage(file, maxSize, function(reducedImage) {
          const name = `${authorId}-${index + 1}.${getExtension(file.name)}`
          setImages(prevState => [...prevState, { image: reducedImage, name }])
        })
      } else {
        setAlertMessage('Invalid extension of the selected file')
      }
    }
    setCurrentImages(imagesName)
    event.target.value = ''
  }

  return (
    <>
        <label htmlFor={id} className={`images_label ${classes.images_label}`} style={{height: `${width}px`}}>
            { isLoading ? <ImSpinner9 size={26} className={classes.spinner}/> : <MdAddAPhoto size={26}/> }
        </label>

      <input id={id} type='file' onChange={handleFileUpload} multiple className={classes.images_input} />
      <p className={classes.images_list}>{getImagesString()}</p>
      <p className={classes.error_message}>{message}</p>
    </>
  )
})

export { AddImages }