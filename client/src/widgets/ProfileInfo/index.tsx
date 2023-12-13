import React from 'react'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'

import {
  EditablePasswordInput,
  getUserId,
  NameField,
  PhoneField,
  RemoveAccount,
  TelegramField,
  WhatsAppField,
} from '../../features'

import classes from './ProfileInfo.module.sass'
import { useAppSelector } from '../../shared'
import { getUserEmail } from '../../features/Profile/model/slice'


interface IProps {
  canRemove: boolean
}

const ProfileInfo: React.FC<IProps> = React.memo(({ canRemove }) => {

  const _id = useAppSelector(getUserId)
  const email = useAppSelector(getUserEmail)

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Name:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <NameField _id={_id} />
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Email:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody_email}>
          <Box>
            <Text fontSize='lg'>{email}</Text>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Password:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditablePasswordInput _id={_id} />
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Phone:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <PhoneField _id={_id} />
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaSquareWhatsapp
            className={classes.whatsapp} />WhatsApp:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <WhatsAppField _id={_id} />
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaTelegram className={classes.telegram} /> Telegram:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <TelegramField _id={_id} />
        </CardBody>
      </Card>

      <RemoveAccount _id={_id} canRemove={canRemove} />
    </div>
  )
})

export { ProfileInfo }