import React from 'react'
import cn from 'classnames'

import { useMatchMedia } from '../../lib/hooks/useMatchMedia'

import classes from './LocationItem.module.sass'

interface IProps {
  item: string
  defaultValue: string
  inputValue: string
  cb: (value: string) => void
}

const LocationItem: React.FC<IProps> = React.memo(({ item, defaultValue, inputValue, cb }) => {
  const { isMobile } = useMatchMedia()

  const handleClick = (value: string) => () => {
    cb(value)
  }

  return (
    <li
      className={cn(classes.li, {
        [classes.hidden]: !item.toLowerCase().startsWith(inputValue.toLowerCase()),
        [classes.selected]: item.toLowerCase() === defaultValue.toLowerCase(),
      })}
    >
      <button
        className={cn(classes.btn, {
          [classes.mobile]: isMobile,
        })}
        onClick={handleClick(item)}
      >
        {item}
      </button>
    </li>
  )
})

export { LocationItem }
