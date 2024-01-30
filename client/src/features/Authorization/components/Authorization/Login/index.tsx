import React from 'react'
import cn from 'classnames'

import { Modal, useAppDispatch, useAppSelector } from '../../../../../shared'

import { getModal, setModal } from '../../../model/slice'
import { LoginForm } from './LoginForm'

import classes from './Login.module.sass'

interface IProps {
  isMobile?: boolean
}

const Login: React.FC<IProps> = React.memo(({ isMobile }) => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)

  const onOpen = React.useCallback(() => {
    dispatch(setModal('login'))
    document.body.style.overflow = 'hidden'
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <button onClick={onOpen} className={cn(classes.btn, { [classes.mobile]: isMobile })}>
        Log In
      </button>
      {isModal === 'login' && (
        <Modal onClose={onClose} title="Log in">
          <LoginForm />
        </Modal>
      )}
    </>
  )
})

export { Login }
