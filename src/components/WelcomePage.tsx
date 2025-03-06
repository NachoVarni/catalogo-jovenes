import '../app/globals.css'
import { Ribeye, Roboto } from 'next/font/google'

interface WelcomePageProps {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoProducts: () => void;
}

const ribeye = Ribeye({weight: '400'})
const roboto = Roboto({weight: '400'})

export const WelcomePage = ({ showPopup, setShowPopup, handleGoProducts }: WelcomePageProps) => {
  return (
    <div className="bg-violet font-['Ribeye', sans-serif] w-full flex items-center justify-center">
      <div className="w-5/6 bg-lightPink border-[15px] border-pink min-h-[625px] flex flex-col justify-center align-center">
          <h2 className={`${ribeye.className} tracking-[10px] m-auto text-center text-[4rem] w-1/2 text-black my-0`}>ARMAZONES DE NIÑO</h2>
        <div className="flex justify-center mt-8">
          <button onClick={() => setShowPopup(true)} className="bg-green px-8 py-3 text-white rounded-2xl font-[Roboto]">Ver modelos</button>
        </div>
      </div>
      {showPopup && (
        <div className={`${roboto.className} fixed inset-0 z-50 flex items-center justify-center`}>
          <div
            className="fixed inset-0 bg-blue opacity-50"
            onClick={() => setShowPopup(false)} // Optional: close on clicking the overlay
          ></div>
          <div className="relative z-10 w-96 p-7 bg-white rounded-lg shadow-lg md:w-[840px] md:p-8">
            <h2 className="my-3 text-darkViolet text-5xl font-bold text-center md:text-start">CATALOGO DE ARMAZONES</h2>
            <h3 className="text-darkViolet mt-5 text-4xl text-center md:text-start">Recomendaciones</h3>
            <ul className="text-black list-disc mt-6 ml-5">
              <li className="text-3xl font-bold">Te recomendamos asistir a tu óptica rápidamente luego de solicitar tu autorización y haber elegido el anteojo. De esta manera podés asegurarte que el armazón elegido esté disponible.</li>
              <li className="text-3xl font-bold">Cuando elijas tu modelo, te sugerimos anotar su código o sacarle una captura de pantalla para cuando te sea solicitado en tu óptica.</li>
              <li className="text-3xl font-bold">Cada modelo tiene una foto del frente y el perfil del armazón, acompañado de una descripción del mismo y su tamaño para que puedan medirlo y buscar el adecuado para cada paciente.</li>
            </ul>
            <div className="flex justify-between mt-8">
              <button className="text-darkViolet font-medium text-sm" onClick={() => setShowPopup(false)}>VOLVER</button>
              <button className="text-darkViolet text-xl font-bold" onClick={handleGoProducts}>¡ENTENDIDO!</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}