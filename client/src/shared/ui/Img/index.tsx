import React from 'react'

import classes from './Img.module.sass'

interface IProps {
  src: string
  alt: string
}

const Img: React.FC<IProps> = React.memo(({ src, alt }) => {
  return (
    <figure className={classes.container}>
      <img alt={alt} src={src} className={classes.image} />
    </figure>
  )
})

export { Img }
