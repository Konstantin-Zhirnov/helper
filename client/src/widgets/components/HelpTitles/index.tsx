import React from 'react'

import { HelpItem, titles } from '../../../shared'

import classes from './HelpTitles.module.sass'

interface IProps {
  widget: string
  setWidget: React.Dispatch<React.SetStateAction<string>>
}

const HelpTitles: React.FC<IProps> = React.memo(({ widget, setWidget }) => {
  return (
    <ul className={classes.ul}>
      {titles.map((item) => (
        <HelpItem
          key={item.widget}
          title={item.title}
          widget={item.widget}
          selectedWidget={widget}
          cb={setWidget}
        />
      ))}
    </ul>
  )
})

export { HelpTitles }
