import React from 'react'

import {CategoryItem, useAppDispatch, useAppSelector} from '../../../../shared'
import { getCategory, setCategory} from "../../model/slice";


interface IProps {
  category: string
}

const Category: React.FC<IProps> = React.memo(({category}) => {

  const dispatch = useAppDispatch()
  const currentCategory = useAppSelector(getCategory)

  const handleClick = () => {
    dispatch(setCategory(category))
  }


  return <CategoryItem category={category} currentCategory={currentCategory} cb={handleClick}/>
})

export { Category }




