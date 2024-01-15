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

        <div className={cn(classes.btn_container, {[classes.open]: open})}>
          <button onClick={handleSettingsClick} className={classes.btn}>Settings</button>
          <button onClick={handleLogoutClick} className={classes.btn}>Log Out</button>
        </div>
    </div>
  )
})

export { User }
