import { useEffect, useRef } from 'react';
import './styles.scss';

interface GalleryProps<T> {
    renderItem: (item: T) => JSX.Element,
    dataset: T[],
    interval: number,
    height: number,
    width: number,
}

export function Gallery<T>({
    renderItem,
    dataset,
    interval = 4000,
    height = 225,
    width = 300
} : GalleryProps<T>) {

    const gallery = useRef<HTMLDivElement>(null);
    const currentItem = useRef(0);
    const intervalId = useRef<number>(0);
    const circularButtons = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
        intervalId.current = setInterval(handleNextItem, interval);

        return () => {
            clearInterval(intervalId.current);
        }
    }, []);

    const resetInterval = () => {
        clearInterval(intervalId.current);
        intervalId.current = setInterval(handleNextItem, interval);
    }

    const handleNextItem = () => handleItemChange(currentItem.current + 1);
    const handlePreviousItem = () => handleItemChange(currentItem.current - 1);

    const handleItemChange = (nextItem: number) => {
        if (nextItem < 0) { 
            // if it goes back when the first image is selected, go to the last image
            nextItem = dataset.length - 1;
        }

        if (nextItem >= dataset.length) {
            // if it goes next when the last image is selected, go to the first image
            nextItem = 0;
        }

        if (!gallery.current) return;

        gallery.current.style.setProperty('--scrollQtd', `-${nextItem * 100}%`);

        const previousActiveButton = circularButtons.current.find(
            (button) => button.ariaCurrent === "true"
        );

        if (previousActiveButton) { 
            previousActiveButton.ariaCurrent = "false";
        }

        circularButtons.current[nextItem].ariaCurrent = "true";

        currentItem.current = nextItem;
    }

    const backItem = () => {
        handlePreviousItem();
        resetInterval();
    };

    const nextItem = () => {
        handleNextItem();
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
                style={{
                    height: `${height}px`,
                    width: `${width}px`
                }}
                className="wrapper"
            >
                <div className="items-list">
                    { 
                        dataset.map((item) => (
                            <div
                                style={{
                                    height: `${height}px`,
                                    width: `${width}px`
                                }}
                                className='item'
                            >
                                {renderItem(item)}
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="controllers">
                <button id="backButton" onClick={backItem}>Back</button>
                <div className="active-buttons">
                    {
                        dataset.map((value, index) => {
                            if (index === 0) {
                                const firstButtonElement = 
                                    <button
                                        key={JSON.stringify(value)}
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
                                    key={JSON.stringify(value)}
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
                <button id="nextButton" onClick={nextItem}>Next</button>
            </div>
        </div>
    );
}