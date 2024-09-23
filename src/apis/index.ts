import { QueryClient, useQuery } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

export const useData = () => {
  return useQuery<{ orders: Order[]; transactions: Transaction[] }>({
    queryKey: ['getdata'],
    queryFn: async () => {
      return fetch('/api/data').then((res) => res.json())
    },
  })
}
