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
  return useQuery({
    queryKey: ['getdata'],
    queryFn: () => {
      return fetch('/api/data').then((res) => res.json())
    },
  })
}
