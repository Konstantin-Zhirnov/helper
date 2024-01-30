import React from 'react'
import ReactDOM from 'react-dom'
import { MdOutlineClose } from 'react-icons/md'

import classes from './Modal.module.sass'

const modalRootElement = document.querySelector('#modal')

interface IProps {
  children: JSX.Element
  onClose: () => void
  title?: string
}

const Modal: React.FC<IProps> = React.memo(({ children, onClose, title }) => {
  return ReactDOM.createPortal(
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>{title}</div>
        <button onClick={onClose} className={classes.btn}>
          <MdOutlineClose />
        </button>
        {children}
      </div>
    </div>,
    modalRootElement,
  )
})

export { Modal }
