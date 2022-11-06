
import { HiMenuAlt3 } from "react-icons/hi";
import Link from 'next/link';


export default function Header({catagories}) {
  
  return (
  <div className="backdrop-blur-md grid justify-between grid-cols-[auto_1fr_auto] gap-2 md:gap-6 bg-white/70 sticky top-0 w-full shadow-sm px-2 md:px-10 py-3 z-50">
        <Link className="text-gray-800 text-xl font-semibold" href="/">
        Wallpaper
        </Link>
        <div>
        </div>
        <HiMenuAlt3
        className="w-8 h-8 text-gray-900"/>

  </div>
  )
}