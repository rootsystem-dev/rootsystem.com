
import { memo } from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
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
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody>
          <ReactTypeformEmbed url={url} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
})