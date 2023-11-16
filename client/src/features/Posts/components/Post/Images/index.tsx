import React from 'react'
import cn from 'classnames'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Spinner,
} from '@chakra-ui/react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { MdOutlineRotate90DegreesCw, MdZoomIn, MdZoomOut } from 'react-icons/md'
import { ImImages } from 'react-icons/im'
import { TiDelete } from 'react-icons/ti'


import { useAppDispatch, useAppSelector } from '../../../../../app'
import { getUserId } from '../../../../Authorization/model/slice'
import { fetchAddImages, fetchRemoveImage } from '../../../model/asyncActions'
import { AddImages } from '../../AddImages'
import { ReasonType } from '../../../types'

import 'react-photo-view/dist/react-photo-view.css'
import classes from './Images.module.sass'


interface IProps {
  imagesSrcArray: string[]
  _id: string
  reason: ReasonType
}

const Images: React.FC<IProps> = ({ imagesSrcArray, _id, reason }) => {

  const dispatch = useAppDispatch()
  const authorId = useAppSelector(getUserId)

  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])

  const getAddImages = () => {
    if (reason === 'profile') {
      if (images.length !== 0) {
        return <Spinner className={classes.snipper} />
      } else {
        return <AddImages setCurrentImages={setCurrentImages} images={images} setImages={setImages}
                          authorId={authorId} />
      }
    }
    return null
  }

  const removeImage = (e, image) => {
    e.stopPropagation()
    dispatch(fetchRemoveImage({ _id, image, folder: authorId }))
  }


  React.useEffect(() => {
    if (images.length !== 0 && (currentImages.length === images.length)) {
      const sendImages = async () => {
        const formData = new FormData()
        formData.append('_id', _id)
        await images.forEach(image => {
          formData.append('images', image.image, image.name)
        })
        await dispatch(fetchAddImages(formData))
        setCurrentImages([])
        setImages([])
      }
      sendImages()
    }
  }, [currentImages, images])


  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box as='span' className={classes.accordionButton}>
            <ImImages />Images
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} className={classes.container}>
          <PhotoProvider
            speed={() => 800}
            easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
            toolbarRender={({ onScale, scale, rotate, onRotate }) => {
              return (
                <>
                  <MdZoomIn className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                            onClick={() => onScale(scale + 1)} />
                  <MdZoomOut className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                             onClick={() => onScale(scale - 1)} />
                  <MdOutlineRotate90DegreesCw className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                                              onClick={() => onRotate(rotate + 90)} />
                </>
              )
            }}
          >
            {imagesSrcArray.map((item, index) => (
              <PhotoView key={index} src={item}>
                <div className={classes.image_container}>
                  <img src={item} style={{ objectFit: 'cover' }} className={classes.image} alt='photo' />
                  {
                    reason === 'profile' && (
                      <button className={classes.remove} aria-label='remove image button'
                              onClick={(e) => removeImage(e, item)}>
                        <TiDelete />
                      </button>
                    )
                  }

                </div>

              </PhotoView>
            ))}

            {getAddImages()}

          </PhotoProvider>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export { Images }
