import React from 'react'
import cn from 'classnames'

import { useMatchMedia } from '../../lib/hooks/useMatchMedia'

import classes from './HelpItem.module.sass'

interface IProps {
  title: string
  widget: string
  selectedWidget: string
  cb: React.Dispatch<React.SetStateAction<string>>
}

const HelpItem: React.FC<IProps> = React.memo(({ title, widget, selectedWidget, cb }) => {
  const { isMobile } = useMatchMedia()

  const handleClick = () => {
    cb(widget)
  }

  return (
    <li
      className={cn(classes.li, {
        [classes.selected]: widget === selectedWidget,
      })}
    >
      <button
        className={cn(classes.btn, {
          [classes.mobile]: isMobile,
        })}
        onClick={handleClick}
      >
        {title}
      </button>
    </li>
  )
})

export { HelpItem }
