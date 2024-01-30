import React from 'react'
import cn from 'classnames'

import { Modal, useAppDispatch, useAppSelector } from '../../../../../shared'

import {
  getMobileMenu,
  getModal,
  getRegistered,
  setMobileMenu,
  setModal,
} from '../../../model/slice'
import { RegistrationForm } from './RegistrationForm'
import { SuccessMessage } from './SuccessMessage'

import classes from './SignUp.module.sass'

interface IProps {
  isMobile?: boolean
  final?: boolean
}

const SignUp: React.FC<IProps> = React.memo(({ isMobile, final }) => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const isMobileMenu = useAppSelector(getMobileMenu)
  const isRegistered = useAppSelector(getRegistered)

  const onOpen = React.useCallback(() => {
    dispatch(setModal(final ? 'registration-final' : 'registration'))
    document.body.style.overflow = 'hidden'
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto'
    if (isMobileMenu) {
      dispatch(setMobileMenu(false))
    }
  }

  return (
    <>
      <button
        onClick={onOpen}
        className={cn(classes.btn, { [classes.mobile]: isMobile, [classes.final]: final })}
      >
        Sign Up {final && 'Now'}
      </button>
      {((!final && isModal === 'registration') || (final && isModal === 'registration-final')) && (
        <Modal onClose={onClose} title="Sign Up">
          {isRegistered ? <SuccessMessage /> : <RegistrationForm />}
        </Modal>
      )}
    </>
  )
})

export { SignUp }
