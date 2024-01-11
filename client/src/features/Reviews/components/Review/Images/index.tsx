import React from 'react'
import cn from 'classnames'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { MdOutlineRotate90DegreesCw, MdZoomIn, MdZoomOut } from 'react-icons/md'
import { ImImages } from 'react-icons/im'


import 'react-photo-view/dist/react-photo-view.css'
import classes from './Images.module.sass'


interface IProps {
  imagesSrcArray: string[]
}

const Images: React.FC<IProps> = React.memo(({ imagesSrcArray }) => {

  return (
    <div>
      <div>
        <div>

            <ImImages />Images

        </div>
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
            {imagesSrcArray.map((item, index) => (
              <PhotoView key={index} src={item}>
                <div className={classes.image_container}>
                  <img src={item} style={{ objectFit: 'cover' }} className={classes.image} alt='photo' />


                </div>

              </PhotoView>
            ))}

          </PhotoProvider>
        </div>
      </div>
    </div>
  )
})

export { Images }
