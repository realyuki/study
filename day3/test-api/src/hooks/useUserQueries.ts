import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchUser, updateUser, deleteUser, createUser } from '@/services/api'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
}

export const useFetchUser = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id
  })
}

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      alert('수정했습니다. 상세 페이지로 이동합니다.')
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
      router.push(`/user/${id}`)
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })
}

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: () => deleteUser(id),
    onSuccess: () => {
      alert('삭제했습니다. 목록 페이지로 이동합니다.')
      queryClient.invalidateQueries({
        queryKey: ['user', id]
      })
      router.push('/user')
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })
}

export const useCreateUser = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      alert('생성했습니다. Users List 페이지로 이동합니다.')
      router.push('/user')
    },
    onError: (error: Error) => {
      alert(error.message)
    }
  })
}
