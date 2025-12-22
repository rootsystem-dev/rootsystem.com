'use client'

import { memo } from 'react'
import { Widget } from '@typeform/embed-react'

import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger
} from '@chakra-ui/react'

/**
 * @typedef {Object} TypeformModalProps
 * @property {string} [title]
 * @property {string} url
 * @property {boolean} isOpen
 * @property {() => void} onClose
 */

/** @type {React.NamedExoticComponent<TypeformModalProps>} */
export const TypeformModal = memo(({ title, url, isOpen, onClose, ...rest }) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={(details) => !details.open && onClose()} {...rest}>
      <DialogBackdrop />
      <DialogContent borderRadius={2} maxWidth="3xl">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogCloseTrigger color="gray.700" zIndex={999} />
        <DialogBody p={0}>
          <Widget
            hideFooter={true}
            hideHeaders={true}
            id="Jnvm4QF7"
            source="rootsystem.com"
            style={{ height: 600, width: '100%' }}
          />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
})