'use client';

import FileItem from '@/app/partient/_components/file-item';
import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Import CSS

// const images = [
//     '/images/img1.jpg',
//     '/images/img2.jpg',
//     '/images/img3.jpg',
// ];

type ImageGalleryProps = {
    images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <div className="grid grid-cols-5 gap-2 mt-4">
            {images.map((img, index) => (
                <FileItem
                    image={img}
                    key={index}
                    onClick={() => {
                        setPhotoIndex(index);
                        setIsOpen(true);
                    }}
                />
            ))}


            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </div>
    );
}
