import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  VisuallyHiddenInput,
  Stack,
  ModalHeader,
  ModalFooter,
  useToast,
  Box,
  Text,
} from '@chakra-ui/react'
import { ChangeEventHandler, useState } from 'react'
import { useData } from '@/apis'

export const Upload = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose(): void
}) => {
  const { refetch } = useData()
  const toast = useToast()
  const [order, setOrder] = useState<File>()
  const [transaction, setTransaction] = useState<File>()

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.[0]
    if (file) {
      setOrder(file)
    }
  }

  const onChangeTran: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.[0]
    if (file) {
      setTransaction(file)
    }
  }

  const onSave = () => {
    if (order && transaction) {
      const form = new FormData()
      form.append('order', order)
      form.append('transaction', transaction)
      fetch('/api/upload', { method: 'post', body: form }).then(() => {
        toast({ title: 'Success' })
        refetch()
      })
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload data</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Box>
                <Button as="label">
                  <VisuallyHiddenInput
                    accept=".json"
                    onChange={onChange}
                    type="file"
                  />
                  Select Order file
                </Button>
                <Text>{order?.name}</Text>
              </Box>
              <Box>
                <Button as="label">
                  <VisuallyHiddenInput
                    onChange={onChangeTran}
                    accept=".json"
                    type="file"
                  />
                  Select Transaction file
                </Button>
                <Text>{transaction?.name}</Text>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onSave}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
