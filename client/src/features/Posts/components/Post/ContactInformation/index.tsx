import React from 'react'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'

import { Modal, useAppDispatch, useAppSelector } from '../../../../../shared'

import { getPostsModal, setModal } from '../../../model/slice'

import classes from './ContactInformation.module.sass'

interface IProps {
  _id: string
  email: string
  phone: string
  whatsapp: string
  telegram: string
}

const ContactInformation: React.FC<IProps> = ({ _id, email, phone, whatsapp, telegram }) => {
  const removeFirstChar = (str, char) => {
    const firstChar = str.at(0)
    if (firstChar === char) {
      return str.slice(1)
    }
    return str
  }

  const dispatch = useAppDispatch()
  const isModal = useAppSelector(getPostsModal)

  const onOpen = React.useCallback(() => {
    dispatch(setModal(`contact-${_id}`))
    document.body.style.overflow = 'hidden'
  }, [])

  const onClose = () => {
    dispatch(setModal(''))
    document.body.style.overflow = 'auto'
  }

  return (
    <>
      <button onClick={onOpen} className={classes.btn}>
        Contact
      </button>
      {isModal === `contact-${_id}` && (
        <Modal onClose={onClose} title="Contact information">
          <div className={classes.container}>
            {email && (
              <div className={classes.contactField}>
                <MdOutlineEmail className={classes.email} />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            )}

            {phone && (
              <div className={classes.contactField}>
                <MdPhone className={classes.phone} />
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            )}

            {whatsapp && (
              <div className={classes.contactField}>
                <FaSquareWhatsapp className={classes.whatsapp} />
                <a href={`https://wa.me/${whatsapp}`}>{whatsapp}</a>
              </div>
            )}

            {telegram && (
              <div className={classes.contactField}>
                <FaTelegram className={classes.telegram} />
                <a href={`https://telegram.im/@${removeFirstChar(telegram, '@')}`}>{telegram}</a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export { ContactInformation }
