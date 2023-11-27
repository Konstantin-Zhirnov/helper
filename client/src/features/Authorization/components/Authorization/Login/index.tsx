import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import { useAppDispatch, useAppSelector } from '../../../../../app'
import { LoginButton } from '../../../../../shared'

import { getLoginModal, setLoginModal } from '../../../model/slice'
import { LoginForm } from './LoginForm'


interface IProps {
  isAuth: boolean
}

const Login: React.FC<IProps> = React.memo(({ isAuth }) => {

  const finalRef = React.useRef(null)
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector(getLoginModal)

  const onOpen = React.useCallback(() => {
    dispatch(setLoginModal(true))
  }, [])

  const onClose = () => {
    dispatch(setLoginModal(false))
  }

  return (
    <>
      <LoginButton onClick={onOpen} isAuth={isAuth} />

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <LoginForm />
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
})

export { Login }