import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import { Transactions } from './Transactions'
import { useData } from '@/apis'

export const List = () => {
  const { data } = useData()
  const modalToggle = useDisclosure()
  const [viewId, setViewId] = useState('')
  return (
    <>
      <Transactions {...modalToggle} viewId={viewId} />
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#ID</Th>
              <Th>Customer Name</Th>
              <Th>Order ID</Th>
              <Th>Price</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.orders?.map((order: any) => {
              return (
                <Fragment key={order.id}>
                  <Tr>
                    <Td>{order.id}</Td>
                    <Td>{order.customerName}</Td>
                    <Td>{order.orderId}</Td>
                    <Td>{order.price}</Td>
                    <Td>{order.date}</Td>
                    <Td>
                      <Button
                        onClick={() => {
                          setViewId(order.id)
                          modalToggle.onOpen()
                        }}
                        variant="link"
                      >
                        View Transactions
                      </Button>
                    </Td>
                  </Tr>
                </Fragment>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
