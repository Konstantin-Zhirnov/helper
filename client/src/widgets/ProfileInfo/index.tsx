import React from 'react'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { FaSquareWhatsapp, FaTelegram } from 'react-icons/fa6'

import { useAppSelector } from '../../app'
import { EditableInput, EditablePasswordInput, getUser } from '../../features'

import classes from './ProfileInfo.module.sass'


const ProfileInfo: React.FC = React.memo(() => {
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
    </div>
  )
})

export { ProfileInfo }