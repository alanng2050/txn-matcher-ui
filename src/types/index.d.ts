type Order = {
  id: string
  type: 'order' | 'txn'
  customerName: string
  orderId: string
  date: string
  product: string
  price: number
}

type Transaction = Order & {
  transactionType: string
  transactionAmount: number
  verifiedId?: string
  suggestedOrderIds?: string[]
}
