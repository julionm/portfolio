import { useEffect, useRef, useState } from 'react';
import './styles.scss';

export function Gallery() {

    const [imgArray,] = useState([
        "https://plus.unsplash.com/premium_photo-1666184129932-e443a8de06e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1682686581312-506a8b53190e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1683223584862-91b693b6db27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1432&q=80",
        "https://images.unsplash.com/photo-1683223585212-6e3cf4cf9473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=983&q=80",
        "https://plus.unsplash.com/premium_photo-1672907031501-b573f4d16056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1683009427619-a1a11b799e05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ]);

    const gallery = useRef<HTMLDivElement>(null);
    const currentImg = useRef(0);
    const intervalId = useRef<number>(0);
    const circularButtons = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
        intervalId.current = setInterval(handleNextImage, 4000);

        return () => {
            clearInterval(intervalId.current);
        }
    }, []);

    const resetInterval = () => {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(handleNextImage, 4000);
    }

    const handleNextImage = () => handleImageChange(currentImg.current + 1);
    const handlePreviousImage = () => handleImageChange(currentImg.current - 1);

    const handleImageChange = (nextImg: number) => {
        if (nextImg < 0) { 
            // if it goes back when the first image is selected, go to the last image
            nextImg = imgArray.length - 1;
        }

        if (nextImg >= imgArray.length) {
            // if it goes next when the last image is selected, go to the first image
            nextImg = 0;
        }

        if (!gallery.current) return;

        gallery.current.style.setProperty('--scrollQtd', `-${nextImg * 100}%`);

        const previousActiveButton = circularButtons.current.find(
            (button) => button.ariaCurrent === "true"
        );

        if (previousActiveButton) { 
            previousActiveButton.ariaCurrent = "false";
        }

        circularButtons.current[nextImg].ariaCurrent = "true";

        currentImg.current = nextImg;
    }

    const backImage = () => {
        handlePreviousImage();
        resetInterval();
    };

    const nextImage = () => {
        handleNextImage();
        resetInterval();
    };

    return (
        <div
            id="galleryComponent"
            className="gallery"
        >
            <div
                ref={gallery}
                id="imagesWrapper"
                className="wrapper"
            >
                <div className="images-list">
                    {
                        imgArray.map(img => (
                            <img key={img} src={img} className="images" />
                        ))
                    }
                </div>
            </div>
            
            <div className="controllers">
                <button id="backButton" onClick={backImage}>Back</button>
                <div className="active-buttons">
                    {
                        imgArray.map((img, index) => {
                            if (index === 0) {
                                const firstButtonElement = 
                                    <button
                                        key={img}
                                        ref={(btnRef) => {
                                            if (!btnRef) return;
                                            circularButtons.current[index] = btnRef;
                                        }}
                                        aria-current="true"
                                        className="circular"
                                    ></button>
                                ;

                                return firstButtonElement;
                            }

                            return (
                                <button
                                    key={img}
                                    ref={(btnRef) => {
                                        if (!btnRef) return;
    
                                        circularButtons.current[index] = btnRef;
                                    }}
                                    aria-current="false"
                                    className="circular"
                                ></button>
                            );
                        })
                    }
                </div>
                <button id="nextButton" onClick={nextImage}>Next</button>
            </div>
        </div>
    );
}