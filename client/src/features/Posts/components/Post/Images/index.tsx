import React from 'react'
import cn from 'classnames'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { MdOutlineRotate90DegreesCw, MdZoomIn, MdZoomOut, MdOutlineHideImage } from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'


import { AddImages } from '../../../../../entities'
import { useAppDispatch, useAppSelector } from '../../../../../shared'

import { fetchAddImages, fetchRemoveImage } from '../../../model/asyncActions'
import { getMessage, setAlertPostsMessage, setMessage } from '../../../model/slice'

import 'react-photo-view/dist/react-photo-view.css'
import classes from './Images.module.sass'


interface IProps {
  imagesSrcArray: string[]
  _id: string
  pathname: string
  authorId: string
}

const Images: React.FC<IProps> = React.memo(({ imagesSrcArray, _id, pathname, authorId }) => {

  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)

  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])
  const [width, setWidth] = React.useState(0);
  const [showAll, setShowAll] = React.useState(false);

  const onAlertMessage = (text) => {
    dispatch(setAlertPostsMessage(text))
  }

  const onMessage = (text) => {
    dispatch(setMessage(text))
  }

  const getAddImages = () => {
    if (pathname === '/profile') {
      if (images.length !== 0) {
        return <div className={classes.snipper} />
      } else {
        return <AddImages
          setCurrentImages={setCurrentImages}
          images={images}
          setImages={setImages}
          authorId={authorId}
          message={message}
          setMessage={onMessage}
          setAlertMessage={onAlertMessage}
        />
      }
    }
    return null
  }

  const removeImage = (e, image) => {
    e.stopPropagation()
    dispatch(fetchRemoveImage({ _id, image, folder: authorId }))
  }

  const handleClick = () => {
    setShowAll(prevState => !prevState)
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

  React.useEffect(() => {
    const setCurrentWidth = () => {
      const width = document.querySelectorAll('.image_container')[0].clientWidth
      if (width) {
        setWidth(width);
      }
    }
    setCurrentWidth()

    window.addEventListener("resize", setCurrentWidth)
    return () => {
      window.removeEventListener("resize", setCurrentWidth)
    }
  }, []);


  return (
        <div className={classes.container}>
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
            {
              (showAll ? imagesSrcArray : imagesSrcArray.slice(0, 3)).map((item, index) => (
                <PhotoView key={index} src={item} >
                  <div className={`image_container ${classes.image_container}`} style={{height: `${width}px`}}>
                    <img src={item} className={classes.image} alt='photo' />
                    {
                        pathname === '/profile' && (
                        <button
                            className={classes.remove}
                            aria-label='remove image button'
                            onClick={(e) => removeImage(e, item)}
                        >
                          <TiDelete />
                        </button>
                      )
                    }
                  </div>
                </PhotoView>
              ))
            }

            { imagesSrcArray.length > 3 && (
                <button className={classes.add} onClick={handleClick} style={{height: width}}>
                  {!showAll ? <>+{imagesSrcArray.length - 3}</> : <MdOutlineHideImage size={24}/>}
                </button>
              )
            }

            {getAddImages()}

          </PhotoProvider>
        </div>
  )
})

export { Images }
