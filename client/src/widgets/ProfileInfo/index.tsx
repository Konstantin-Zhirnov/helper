import React from 'react'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react'
import { FaTelegram, FaSquareWhatsapp, FaViber } from 'react-icons/fa6'

import { useAppSelector } from '../../app'
import { getUser, EditablePasswordInput, EditableInput } from '../../features'


import classes from './ProfileInfo.module.sass'



const ProfileInfo: React.FC = () => {
  const user = useAppSelector(getUser)

  return (
    <>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Name:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.name} field="name"/>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Email:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <Text fontSize='lg'>{user.email}</Text>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Password:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditablePasswordInput _id={user._id}/>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md'>Phone:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.phone} field="phone"/>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaSquareWhatsapp className={classes.whatsapp}/>WhatsApp:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.whatsapp} field="whatsapp"/>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaTelegram className={classes.telegram}/> Telegram:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.telegram} field="telegram"/>
          </Box>
        </CardBody>
      </Card>

      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>
          <Heading size='md' className={classes.heading}><FaViber className={classes.viber}/>Viber:</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <EditableInput _id={user._id} defaultValue={user.viber} field="viber"/>
          </Box>
        </CardBody>
      </Card>

    </>
  )
}

export { ProfileInfo }