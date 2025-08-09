import { House } from "lucide-react"

export default function Home({ onClick }){
    return(
        <>
          <button className="
          w-12 h-12 flex items-center justify-center
          rounded-full text-gray-600 bg-white
          hover:bg-green-300 hover:ring-green-600
          active:bg-green-100
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-green-500/20
          shadow-lg border border-gray-200
        "
        title="Home"
        onClick={onClick}>
            <House strokeWidth={2} size={20}/>
          </button>
        </>
    )
}