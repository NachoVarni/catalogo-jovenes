import GoBackButton from "./GoBackButton"
interface HeaderProductsProps {
    goBackTo: string
  }
  

export const HeaderProducts = ({goBackTo}: HeaderProductsProps) => {

    return (
        <div className="flex justify-between items-center bg-violet p-6 relative w-full h-auto ">
            <GoBackButton styles="my-3 text-white font-bold" text="Volver" to={goBackTo} />
        </div>
    )
}