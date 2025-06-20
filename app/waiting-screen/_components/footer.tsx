import { memo } from "react"

const Footer = () => {
    return <div className="bg-green-900 text-white text-center py-3 text-base font-extrabold rounded-b-md flex-shrink-0 tracking-wider select-none">
        <div className="grid grid-cols-12">
            <div className="col-span-4">Tổng đài: 02763 797999</div>
            <div className="col-span-4">Hotline: 1900 561 510</div>
            <div className="col-span-4">Cấp cứu: 0888 79 52 59</div>
        </div>
    </div>
}

export default memo(Footer);