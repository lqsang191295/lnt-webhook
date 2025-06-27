'use client'

import { useRef, useState } from 'react'
import { Fullscreen } from 'lucide-react'

export default function FullscreenToggle() {
    const [hidden, setHidden] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement>(null)

    const enterFullscreen = () => {
        if (divRef.current?.requestFullscreen) {
            divRef.current.requestFullscreen()
        }

        setHidden(true);
    }

    if (hidden) return;

    return (
        <div ref={divRef} className="absolute top-1 right-1 bg-blue-500 rounded-xs p-1 z-10">
            <div onClick={enterFullscreen}><Fullscreen className='text-white' /></div>
        </div>
    )
}
