import { memo } from "react"

const Footer = () => {
    return <div className="bg-green-900 text-white text-center py-1 sm:py-2 lg:py-3 text-xs sm:text-sm md:text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-0.5 sm:gap-1">
      <div className="px-1 sm:px-2">Tổng đài: 02763 797999</div>
      <div className="px-1 sm:px-2">Hotline: 1900 561 510</div>
      <div className="px-1 sm:px-2">Cấp cứu: 0888 79 52 59</div>
    </div>
  </div>
}

export default memo(Footer);