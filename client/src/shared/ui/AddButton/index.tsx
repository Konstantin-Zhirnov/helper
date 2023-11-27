import React from 'react'
import { Button } from '@chakra-ui/react'


import classes from './AddButton.module.sass'

interface IProps {
  onOpen: () => void
}

const AddButton: React.FC<IProps> = React.memo(({ onOpen }) => {


  const handleClick = () => {
    onOpen()
  }

  return (
    <Button mt={4} onClick={handleClick} className={classes.open_btn}>
      <svg className='MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv' focusable='false' aria-hidden='true'
           viewBox='0 0 24 24' data-testid='AddIcon'>
        <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'></path>
      </svg>
    </Button>
  )
})

export { AddButton }