import React from 'react'

import { Category } from "../../features";
import { categories } from "../../shared";

import classes from './Categories.module.sass'



const Categories: React.FC = () => {

  const renderItem = (category: string) => (
    <Category key={category} category={category}/>
  )

  return (
      <div className={classes.container}>
        <h2 className={classes.title}>Explore by category</h2>
        <ul className={classes.ul}>
          {categories.map(renderItem)}
        </ul>
      </div>

  )
}

export { Categories }
