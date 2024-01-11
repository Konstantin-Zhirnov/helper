import React from 'react'
import cn from 'classnames'
import {useNavigate} from 'react-router-dom';
import {BiChevronDown} from "react-icons/bi";

import {useAppDispatch} from "../../../../../shared";
import {fetchLogout} from "../../../model/asyncActions";

import classes from './User.module.sass'

interface IProps {
    name: string
}

const User: React.FC<IProps> = React.memo(({ name}) => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(prevState => !prevState)
  }


  const handleSettingsClick = () => {
      navigate('/profile')
      setOpen(false)
  }

  const handleLogoutClick = () => {
    dispatch(fetchLogout())
    setOpen(false)
  }

  return (
      <div className={classes.container}>
        <div onClick={handleClick} className={classes.view}>
          {name}
          <BiChevronDown size={20} className={cn(classes.arrow_icon, {[classes.rotate]: open})}/>
        </div>

        <ul className={cn(classes.ul, {[classes.open]: open})}>
          <li onClick={handleSettingsClick} className={classes.li}>Settings</li>
          <li onClick={handleLogoutClick} className={classes.li}>Log Out</li>
        </ul>
    </div>
  )
})

export { User }
