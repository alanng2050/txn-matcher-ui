import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react'
import { Fragment, useState } from 'react'
import { useData } from '@/apis'

export const Unverified = () => {
  const toast = useToast()
  const { refetch } = useData()
  const [updateData, setUpdateData] = useState<Record<string, string>>({})
  const onSelect = (txId: string, orderId: string) => {
    setUpdateData((prev) => ({ ...prev, [txId]: orderId }))
  }
  const { data } = useData()
  const list = data?.transactions?.filter((item: any) => !item.verifiedId)

  const onSave = () => {
    fetch('/api/update', {
      method: 'post',
      body: JSON.stringify(updateData),
      headers: {
        'content-type': 'application/json',
      },
    }).then(() => {
      refetch()
      toast({ title: 'Updated' })
    })
  }

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>#ID</Th>
              <Th>Customer Name</Th>
              <Th>Order ID</Th>
              <Th>Product</Th>
              <Th>Date</Th>
              <Th>Transaction Type</Th>
              <Th>Transaction Amount</Th>
              <Th>Select Order Match</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.map((item: any) => {
              return (
                <Fragment key={item.id}>
                  <Tr>
                    <Td>{item.id}</Td>
                    <Td>{item.customerName}</Td>
                    <Td>{item.orderId}</Td>
                    <Td>{item.product}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.transactionType}</Td>
                    <Td>{item.transactionAmount}</Td>
                    <Td>
                      <Select
                        onChange={(evt) => {
                          onSelect(item.id, evt.target.value)
                        }}
                      >
                        <option>Select</option>
                        {data?.orders?.map((order: any) => (
                          <option value={order.id} key={order.id}>
                            {order.customerName}({order.id})
                            {item.suggestedOrderIds?.includes(order.id)
                              ? '(Suggested)'
                              : ''}
                          </option>
                        ))}
                      </Select>
                    </Td>
                  </Tr>
                </Fragment>
              )
            })}
          </Tbody>
        </Table>
        <Button onClick={onSave} sx={{ mt: 4, float: 'right', minWidth: 120 }}>
          Save
        </Button>
      </TableContainer>
    </>
  )
}
