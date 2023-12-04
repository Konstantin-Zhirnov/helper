import React from 'react'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'


import { EditableInput, EditablePasswordInput, getUser, RemoveAccount } from '../../features'
import { useAppSelector } from '../../shared'

import classes from './ProfileInfo.module.sass'


interface IProps {
  canRemove: boolean
}

const ProfileInfo: React.FC<IProps> = React.memo(({ canRemove }) => {
  const user = useAppSelector(getUser)

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Name:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.name} field='name' />
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Email:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody_email}>
          <Box>
            <Text fontSize='lg'>{user.email}</Text>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Password:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditablePasswordInput _id={user._id} />
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Phone:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.phone} field='phone' />
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaSquareWhatsapp
            className={classes.whatsapp} />WhatsApp:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.whatsapp} field='whatsapp' />
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaTelegram className={classes.telegram} /> Telegram:</Heading>
        </CardHeader>
        <CardBody className={classes.cardBody}>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.telegram} field='telegram' />
          </Box>
        </CardBody>
      </Card>

      <RemoveAccount _id={user._id} canRemove={canRemove} />
    </div>
  )
})

export { ProfileInfo }