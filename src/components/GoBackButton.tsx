"use client"

import { useRouter } from "next/navigation"

interface GoBackButtonProps {
  text: string,
  to: string,
  styles: string
}

const GoBackButton = ({text, to, styles}: GoBackButtonProps) => {
  const router = useRouter()

  const handleGoBack = () => {
    router.push(`/${to}`)
  }

  return (
    <button className={styles} onClick={handleGoBack}>
      {text}
    </button>
  )
}

export default GoBackButton
