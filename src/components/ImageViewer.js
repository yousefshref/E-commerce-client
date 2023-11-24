import React, { useEffect, useState } from 'react';
import { server } from '../../config'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdFullscreen } from 'react-icons/md';

const ImageViewer = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images ? images[0]?.image : '');
    const [show, setShow] = useState(false);

    useEffect(() => {
        setSelectedImage(images ? images[0] : '')
    }, [images])

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };


    return (
        <div className='flex gap-5'>
            <div className='flex flex-col gap-3'>
                
                {
                images?.length == 1 ?
                null
                :
                images?.map((image, index) => (
                    <Image
                        loading="lazy"
                        className={selectedImage?.id == image?.id ? "border border-orange-500" : ""}
                        width={60}
                        height={60}
                        key={index}
                        src={server + image?.image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => handleThumbnailClick(image)}
                    />
                ))}
            </div>
            <div className='relative'>
                <Image loading="lazy" width={300} height={300} src={images?.length == 1 ? server+images[0]?.image : server+selectedImage?.image} alt="Main" />
                <span onClick={() => setShow(true)} className='bg-white absolute top-1 right-1 text-2xl transition-all hover:rounded-xl cursor-pointer'>
                    <MdFullscreen />
                </span>
            </div>
            {
                show ?
                <div className='absoluteCenter bg-black w-full h-full z-[300] bg-opacity-70'>
                    <div className='absoluteCenter flex flex-col gap-3'>
                        <Image loading="lazy" width={500} height={500} src={images?.length == 1 ? server+images[0]?.image : server+selectedImage?.image} alt="Main" />
                        <button onClick={() => setShow(false)} className='bg-red-300'>Close</button>
                    </div>
                </div>
                :null
            }
        </div>
    );
};

export default ImageViewer