'use client'

import { useState } from "react"
import { WelcomePage } from "@/components/WelcomePage"
import { useRouter } from "next/navigation"

export default function HomePage() {

  const router = useRouter()

  const [showPopup, setShowPopup] = useState(false);


  const handleGoProducts = () => {
    router.push(`/productos/general`)
  }

  return (
    <main className="bg-violet h-full flex flex-col md:flex-row md:min-h-screen">
      <WelcomePage
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        handleGoProducts={handleGoProducts}
      />
    </main>
  )
}