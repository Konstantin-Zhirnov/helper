import React from 'react'
import cn from "classnames";

import { ReactComponent as SearchIcon } from './search.svg'

import classes from './CategoryItem.module.sass'


interface IProps {
  category: string
  currentCategory: string
  cb: () => void
}


const CategoryItem: React.FC<IProps> = React.memo(({ category, currentCategory, cb }) => {
    const handleClick = () => {
        cb()
    }

  return (
      <li className={cn(classes.container, {[classes.selected]: category === currentCategory})}>
          <button className={classes.btn} onClick={handleClick}>
              <div className={classes.category}>
                  {category}
              </div>
              <SearchIcon/>
          </button>
      </li>
  )
})

export { CategoryItem }
