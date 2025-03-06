"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { KidsLogo } from "../../public/icons"

interface CatalogQuestionProps {
    isMobile: boolean
}

export const CatalogQuestion = ({ isMobile }: CatalogQuestionProps) => {

    const router = useRouter()

    const handleSelectMaterial = (material: string) => {
        router.push(`/productos/${material.toLowerCase()}`)
    }

    return (
        <>
            {isMobile ?
                <div className="flex flex-col items-center">
                    <h3 className="mt-14 text-blue text-3xl font-bold font-roboto text-center">CATÁLOGO DIGITAL</h3>
                    <p className="mt-6 pt-2 text-blue text-xl font-bold font-roboto text-center w-80">SELECCIONA LA LINEA QUE DESEAS VER</p>
                    <button onClick={() => handleSelectMaterial("premium")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl hover:bg-red hover:text-white px-10 py-5">Premium</button>
                    <button onClick={() => handleSelectMaterial("estandar")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl hover:bg-red hover:text-white px-10 py-5">Estandar</button>
                    <button onClick={() => handleSelectMaterial("nino")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl hover:bg-red hover:text-white px-10 py-5">Niños</button>
                </div> :
                <main className="hidden md:flex min-h-screen w-full">
                    <div className="w-1/3 bg-blue min-h-screen relative">
                        <div className="absolute top-[55%] right-0 translate-x-1/2 -translate-y-1/2">
                            <Image
                                src="/question-image.png"
                                width={544}
                                height={597}
                                alt="pregunta"
                                className=""
                            />
                        </div>

                    </div>
                    <div className="pt-4 flex flex-col items-center w-full lg:justify-center lg:pl-32">
                        <div className="flex items-center">
                            <KidsLogo styles="" width={61} height={60} />
                            <h2 className="text-7xl ml-5">NIÑOS</h2>
                        </div>
                        <h3 className="mt-14 text-blue text-3xl font-bold text-center">CATALOGO DE OPTICA</h3>
                        <h3 className="mt-5 text-blue text-3xl font-bold text-center">MUESTRARIO DIGITAL</h3>
                        <p className="mt-6 pt-2 text-blue text-xl font-bold text-center">SELECCIONA LA LINEA QUE DESEAS VER</p>
                        <div className="flex">
                            <button onClick={() => handleSelectMaterial("premium")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl hover:bg-red hover:text-white px-10 py-5">Premium</button>
                            <button onClick={() => handleSelectMaterial("estandar")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl ml-5 hover:bg-red hover:text-white px-10 py-5">Estandar</button>
                            <button onClick={() => handleSelectMaterial("nino")} className="text-2xl min-w-44 mt-10 font-semibold border-solid border border-blue rounded-xl ml-5 hover:bg-red hover:text-white px-10 py-5">Niños</button>
                        </div>
                    </div>
                </main>
            }
        </>
    )
}