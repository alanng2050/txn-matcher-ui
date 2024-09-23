import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import { Fragment } from 'react'
import { useData } from '@/apis'

export const Transactions = ({
  isOpen,
  onClose,
  viewId,
}: {
  isOpen: boolean
  onClose(): void
  viewId?: string
}) => {
  const { data } = useData()
  const list = data?.transactions?.filter((item) => item.verifiedId === viewId)

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Customer Name</Th>
                  <Th>Order ID</Th>
                  <Th>Transaction Type</Th>
                  <Th>Transaction Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list?.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <Tr>
                        <Td>{item.customerName}</Td>
                        <Td>{item.orderId}</Td>
                        <Td>{item.transactionType}</Td>
                        <Td>{item.transactionAmount}</Td>
                      </Tr>
                    </Fragment>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
