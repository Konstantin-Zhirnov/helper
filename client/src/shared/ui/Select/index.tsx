import React from 'react'
import cn from 'classnames'
import {BiChevronDown} from "react-icons/bi";
import {AiOutlineSearch} from "react-icons/ai";

import classes from './Select.module.sass'

interface IProps {
  options: string[]
  defaultValue: string
  cb: (value: string) => void
  ml0?: boolean
  mr0?: boolean
  category?: boolean
}

const Select: React.FC<IProps> = React.memo(({ options, defaultValue, cb, ml0, mr0, category }) => {

  const [selected, setSelected] = React.useState(defaultValue)
  const [inputValue, setInputValue] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(prevState => !prevState)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleOptionClick = (value) => () => {
    if(value.toLowerCase() !== selected.toLowerCase()) {
      setSelected(value)
      setInputValue('')
      cb(value)
      setOpen(false)
    }
  }

  React.useEffect(() => {
    if(defaultValue !== selected) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  return (
      <div className={cn(classes.container, {[classes.ml_0]: ml0, [classes.mr_0]: mr0, [classes.category]: category})}>
        <div onClick={handleClick} className={classes.view}>
          <p>
            {selected
                ? selected.length > 12
                    ? !category
                        ? selected.substring(0, 12) + "..."
                        : selected
                    : selected
                : ''
            }
          </p>
          <BiChevronDown size={20} className={cn(classes.arrow_icon, {[classes.rotate]: open})}/>
        </div>

        <ul className={cn(classes.ul, {[classes.open]: open})}>
          <div className={classes.search_container}>
            <AiOutlineSearch size={16} className={classes.search_icon}/>
            <input
                type='text'
                value={inputValue}
                onChange={handleChange}
                placeholder='Enter location'
                className={classes.input}
            />
          </div>

          {
            options.map((item) => (
                <li
                    key={item}
                    onClick={handleOptionClick(item)}
                    className={cn(classes.li, {
                      [classes.selected]: item.toLowerCase() === selected.toLowerCase(),
                      [classes.hidden]: !item.toLowerCase().startsWith(inputValue)
                    })}
                >
                  {item}
                </li>
                  ))
          }
        </ul>
    </div>
  )
})

export { Select }
