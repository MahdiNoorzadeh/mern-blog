import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                تبلیغات گسترده در ایران
            </h2>
            <p className="text-gray-500 my-2">
                با هر کلیک یک قدم به موفقیت نزدیک تر شو
            </p>
            <Button gradientDuoTone='pinkToOrange' outline className="">
                <a href="www.linkedin.com/in/mahdi-noorzadeh-7927a1218" target="_blank" rel="noopener noreferrer">
                    بزن بریم
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://deema.agency/wp-content/uploads/2024/01/Marketing-in-Iran.jpg" alt="Maketing Image" />
        </div>
    </div>
  )
}
