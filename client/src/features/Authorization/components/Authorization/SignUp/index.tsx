import React from 'react'
import cn from "classnames";

import {Modal, useAppDispatch, useAppSelector} from "../../../../../shared";

import {getModal, getRegistered, setModal} from "../../../model/slice";
import {RegistrationForm} from "./RegistrationForm";

import classes from './SignUp.module.sass'


interface IProps {
  isMobile?: boolean
  final?: boolean
}

const SignUp: React.FC<IProps> = React.memo(({isMobile, final}) => {
  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getModal)
  const isRegistered = useAppSelector(getRegistered)


  const onOpen = React.useCallback(() => {
    dispatch(setModal(final ? 'registration-final' : 'registration'))
    document.body.style.overflow = 'hidden';
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto';
  }

  return (
      <>
        <button
            onClick={onOpen}
            className={cn(classes.btn, {[classes.mobile]: isMobile, [classes.final]: final})}
        >
          Sign Up {final && 'Now'}
        </button>
        {
            ((!final && isModal === 'registration') || (final && (isModal === 'registration-final'))) && (
            <Modal onClose={onClose} title="Sign Up">
              {
                isRegistered
                  ? <>
                      <p className={classes.text}>
                        Your user account has been successfully created. Please confirm your email.
                      </p>
                      <p className={classes.text}>
                        If you haven`t received an email within 30 seconds, then check the Spam folder.
                      </p>
                    </>

                  : <RegistrationForm />
                }
            </Modal>
          )
        }
      </>
  )
})

export { SignUp }