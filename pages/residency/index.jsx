import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ResidencyPage () {
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.push('/apply')
    }
  }, [])
  return (<></>)
}