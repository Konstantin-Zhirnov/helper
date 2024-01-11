import React from 'react'
import { MdClose } from "react-icons/md";
import { MdMenu } from "react-icons/md";

import {useAppDispatch, useAppSelector} from "../../../../shared";

import {getMobileMenu, setMobileMenu} from "../../model/slice";

import classes from './MobileMenuButton.module.sass'


const MobileMenuButton: React.FC = React.memo(() => {

  const dispatch = useAppDispatch()
  const isMobileMenu = useAppSelector(getMobileMenu)

  const handleClick = () => {
    dispatch(setMobileMenu(!isMobileMenu))
  }

  return (
    <button onClick={handleClick} className={classes.btn}>
      {isMobileMenu ? <MdClose size={20}/> : <MdMenu size={20}/>}
    </button>
  )
})

export { MobileMenuButton }
