import React from 'react'
import cn from 'classnames'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { MdOutlineRotate90DegreesCw, MdZoomIn, MdZoomOut, MdOutlineHideImage } from 'react-icons/md'

import { AddImages } from '../../../../../entities'
import { useAppDispatch, useAppSelector } from '../../../../../shared'

import { fetchAddImages } from '../../../model/asyncActions'
import { getPostsLoading, getMessage, setAlertPostsMessage, setMessage } from '../../../model/slice'

import { RemoveImgButton } from './RemoveImgButton'

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
  const isLoading = useAppSelector(getPostsLoading)

  const [currentImages, setCurrentImages] = React.useState([])
  const [images, setImages] = React.useState([])
  const [showAll, setShowAll] = React.useState(false)

  const onAlertMessage = (text: string) => {
    dispatch(setAlertPostsMessage(text))
  }

  const onMessage = (text: string) => {
    dispatch(setMessage(text))
  }

  const handleClick = () => {
    setShowAll((prevState) => !prevState)
  }

  React.useEffect(() => {
    if (images.length !== 0 && currentImages.length === images.length) {
      const formData = new FormData()
      formData.append('_id', _id)
      const sendImages = async () => {
        await images.forEach((image) => {
          formData.append('images', image.image, image.name)
        })
      }
      sendImages().then(() => {
        dispatch(fetchAddImages(formData))
        setCurrentImages([])
        setImages([])
      })
    }
  }, [currentImages, images])

  return (
    <div className={classes.container}>
      <PhotoProvider
        speed={() => 800}
        easing={(type) =>
          type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
        toolbarRender={({ onScale, scale, rotate, onRotate }) => {
          return (
            <>
              <MdZoomIn
                className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                onClick={() => onScale(scale + 1)}
              />
              <MdZoomOut
                className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                onClick={() => onScale(scale - 1)}
              />
              <MdOutlineRotate90DegreesCw
                className={cn('PhotoView-Slider__toolbarIcon', classes.icon)}
                onClick={() => onRotate(rotate + 90)}
              />
            </>
          )
        }}
      >
        {(showAll ? imagesSrcArray : imagesSrcArray.slice(0, 3)).map((item, index) => (
          <PhotoView key={index} src={item}>
            <div className={classes.image_container}>
              <img src={item} className={classes.image} alt="photo" />
              {pathname === '/profile' && (
                <RemoveImgButton _id={_id} authorId={authorId} item={item} />
              )}
            </div>
          </PhotoView>
        ))}

        {imagesSrcArray.length > 3 && (
          <button className={classes.add} onClick={handleClick}>
            {!showAll ? <>+{imagesSrcArray.length - 3}</> : <MdOutlineHideImage size={24} />}
          </button>
        )}

        {pathname === '/profile' && (
          <AddImages
            setCurrentImages={setCurrentImages}
            images={images}
            setImages={setImages}
            authorId={authorId}
            message={message}
            isLoading={isLoading}
            setMessage={onMessage}
            setAlertMessage={onAlertMessage}
          />
        )}
      </PhotoProvider>
    </div>
  )
})

export { Images }
