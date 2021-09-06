
import { memo } from 'react'
import { Widget } from '@typeform/embed-react'

import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

export const TypeformModal = memo(({ title, url, ...rest }) => {
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent borderRadius={2} maxWidth="2xl">
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton color="gray.700" zIndex={999} />
        <ModalBody p={0}>
          <Widget
            hideFooter={true}
            hideHeaders={true}
            id="Jnvm4QF7"
            style={{ height: 600, width: '100%' }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})