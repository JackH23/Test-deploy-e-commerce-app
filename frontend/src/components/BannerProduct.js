import React, { useEffect, useState } from 'react';

// Importing banner images for desktop view
import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';

// Importing banner images for mobile view
import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

// Importing navigation icons from react-icons library
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
    // State to track the current image index being displayed
    const [currentImage, setCurrentImage] = useState(0);

    // Array of desktop images for the banner
    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    // Array of mobile images for the banner
    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ];

    // Function to show the next image in the carousel
    const nextImage = () => {
        // If the current image is not the last one, increment the currentImage index
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    // Function to show the previous image in the carousel
    const preveImage = () => {
        // If the current image is not the first one, decrement the currentImage index
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    // Auto-slide functionality using useEffect to change the image every 5 seconds
    useEffect(() => {
        // Set up an interval to call nextImage every 5 seconds
        const interval = setInterval(() => {
            // If not the last image, go to the next image, otherwise reset to the first image
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        // Cleanup the interval when the component is unmounted or currentImage changes
        return () => clearInterval(interval);
    },[currentImage]);

    return (
        <div className='container mx-auto px-4 rounded '>
            {/* Container for the banner with responsive height */}
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

                {/* Navigation buttons (left and right arrows) for desktop view */}
                <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className='flex justify-between w-full text-2xl'>
                        {/* Button to navigate to the previous image */}
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
                        {/* Button to navigate to the next image */}
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>

                {/* Image carousel for desktop and tablet view */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        // Map through desktopImages array and render each image
                        desktopImages.map((imageURl, index) => {
                            return (
                                // Container for each image with sliding animation
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    {/* Image tag to display the image */}
                                    <img src={imageURl} className='w-full h-full'/>
                                </div>
                            );
                        })
                    }
                </div>

                {/* Image carousel for mobile view */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        // Map through mobileImages array and render each image for mobile view
                        mobileImages.map((imageURl, index) => {
                            return (
                                // Container for each image with sliding animation
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    {/* Image tag with additional styling for mobile view */}
                                    <img src={imageURl} className='w-full h-full object-cover'/>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div>
    );
}

export default BannerProduct;
