import React from 'react'
import cn from 'classnames'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { MdOutlineRotate90DegreesCw, MdZoomIn, MdZoomOut, MdOutlineHideImage } from 'react-icons/md'

import { useGetWidth } from "../../../../../shared";

import 'react-photo-view/dist/react-photo-view.css'
import classes from './Images.module.sass'



interface IProps {
  imagesSrcArray: string[]
}

const Images: React.FC<IProps> = React.memo(({ imagesSrcArray }) => {

    const width = useGetWidth('.image_container')
  // const [width, setWidth] = React.useState(0);
  const [showAll, setShowAll] = React.useState(false);


  const handleClick = () => {
    setShowAll(prevState => !prevState)
  }


  // React.useEffect(() => {
  //   const setCurrentWidth = () => {
  //     const width = document.querySelectorAll('.image_container')[0].clientWidth
  //     if (width) {
  //       setWidth(width);
  //     }
  //   }
  //   setCurrentWidth()
  //
  //   window.addEventListener("resize", setCurrentWidth)
  //   return () => {
  //     window.removeEventListener("resize", setCurrentWidth)
  //   }
  // }, []);


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

          </PhotoProvider>
        </div>
  )
})

export { Images }
