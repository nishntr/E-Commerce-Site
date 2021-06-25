import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default function TopCarousel() {
    return (
        <Carousel className="carousel" >
            <Carousel.Item
                onClick={() => console.log("iphone")}>
                <img

                    className="d-block "
                    src="https://www.pngkey.com/png/full/762-7626746_iphone-x-mockup-with-colorful-back-iphone-x.png"
                    alt="iPhone X"
                />
                <Carousel.Caption className="">
                    <h3>iPhone X</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block "
                    src="https://images-na.ssl-images-amazon.com/images/I/81-fNmQqlLL._SL1500_.jpg"
                    alt="Pixel 5"
                />

                <Carousel.Caption >
                    <h3>Pixel 5</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block "
                    src="https://www.dondolo.co.uk/image/cache/catalog/nokia/Nokia-3310-2017-1024x1024.png.webp"
                    alt="Nokia 3310"
                />

                <Carousel.Caption >
                    <h3>Nokia 3310</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}
