'use client';

import FileItem from '@/app/partient/_components/file-item';
import { iFilePatient } from '@/types/patient';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 

type ImageGalleryProps = {
    files: iFilePatient[]
}

export default function ImageGallery({ files }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <div className="grid grid-cols-7 gap-2 mt-4">
            {files.map((f, index) => (
                <FileItem
                    image={f.url}
                    key={index}
                    onClick={() => {
                        setPhotoIndex(index);
                        setIsOpen(true);
                    }}
                />
            ))}


            {isOpen && (
                <Lightbox
                    mainSrc={files[photoIndex].url}
                    nextSrc={files[(photoIndex + 1) % files.length].url}
                    prevSrc={files[(photoIndex + files.length - 1) % files.length].url}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + files.length - 1) % files.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % files.length)
                    }
                />
            )}
        </div>
    );
}
