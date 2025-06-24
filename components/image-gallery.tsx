'use client'

import { iFilePatient } from '@/types/patient'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import FileItem from '@/app/(doctor&patient)/_components/file-item'
import Image from 'next/image'

type Props = {
    files: iFilePatient[]
}

export default function ImageGallery({ files }: Props) {
    const [index, setIndex] = useState<number | null>(null)

    const currentFile = index !== null ? files[index] : null
    const isPdf = currentFile ? /\.pdf$/i.test(currentFile.url) : false

    const close = () => setIndex(null)
    const prev = () => setIndex((prev) => (prev! - 1 + files.length) % files.length)
    const next = () => setIndex((prev) => (prev! + 1) % files.length)
    const download = () => {
        if (!currentFile) return
        const link = document.createElement('a')
        link.href = currentFile.url
        link.download = currentFile.filename
        link.click()
    }

    return (
        <>
            <div className="grid grid-cols-6 gap-3 mt-4">
                {files.map((f, i) => (
                    <FileItem
                        file={f}
                        key={i}
                        onClick={() => { setIndex(i) }}
                    />
                ))}
            </div>

            <Dialog open={index !== null} onOpenChange={(v) => !v && close()}>
                <DialogContent className="w-full h-full p-4 grid-rows-[auto_1fr] [&>button.absolute.top-4.right-4]:hidden" style={{ maxWidth: 'unset', background: '#00000050' }} >
                    <div className="flex flex-row justify-center">
                        <div className="font-medium truncate text-white text-xl">{currentFile?.filename}</div>
                        <div className="flex gap-2 absolute right-4">
                            <Button className='bg-gray-400 cursor-pointer' size="icon" variant="ghost" onClick={download}>
                                <Download size={18} />
                            </Button>

                            <Button className='bg-gray-400 cursor-pointer' size="icon" variant="ghost" onClick={close}>
                                <X size={18} />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full h-full">
                        <Button className='bg-gray-400 cursor-pointer' size="icon" variant="ghost" onClick={prev}>
                            <ChevronLeft size={28} />
                        </Button>

                        <div className="w-full h-full flex justify-center items-center overflow-hidden">
                            {isPdf ? (
                                <iframe src={currentFile?.url} className="w-full h-full" />
                            ) : (
                                <Image
                                    src={currentFile?.url ?? ''}
                                    alt={currentFile?.filename ?? ''}
                                    className="max-h-full max-w-full object-contain"
                                    width={800} // hoặc bất kỳ giá trị bạn muốn
                                    height={600}
                                    unoptimized // dùng khi ảnh không phải từ domain Next config
                                />
                            )}
                        </div>

                        <Button className='bg-gray-400 cursor-pointer' size="icon" variant="ghost" onClick={next}>
                            <ChevronRight size={28} />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
