import React from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import { MdOutlineEmail, MdPhone } from 'react-icons/md'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'
import { RiContactsBook2Fill } from 'react-icons/ri'

import classes from './ContactInformation.module.sass'


interface IProps {
  email: string
  phone: string
  whatsapp: string
  telegram: string
}

const ContactInformation: React.FC<IProps> = ({ email, phone, whatsapp, telegram }) => {

  const removeFirstChar = (str, char) => {
    const firstChar = str.at(0)
    if (firstChar === char) {
      return str.slice(1)
    }
    return str
  }


  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Box as='span' className={classes.accordionButton}>
            <RiContactsBook2Fill />Contact information
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} className={classes.contacts}>
          {email && <div className={classes.contactField}>
            <MdOutlineEmail className={classes.email} />
            <a href={`mailto:${email}`}>{email}</a>
          </div>}
          {phone && <div className={classes.contactField}>
            <MdPhone className={classes.phone} />
            <a href={`tel:${phone}`}>{phone}</a>
          </div>}
          {whatsapp &&
            <div className={classes.contactField}>
              <FaSquareWhatsapp className={classes.whatsapp} />
              <a href={`https://wa.me/${whatsapp}`}>{whatsapp}</a>
            </div>}
          {telegram &&
            <div className={classes.contactField}>
              <FaTelegram className={classes.telegram} />
              <a href={`https://telegram.im/@${removeFirstChar(telegram, '@')}`}>{telegram}</a>
            </div>}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export { ContactInformation }
