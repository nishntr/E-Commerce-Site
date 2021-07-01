import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/products'

function TopCarousel(props) {
    TopCarousel.propTypes = {
        products: PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired
    }

    useEffect(() => {
        props.getProducts()
    }, [])

    return (
        <Carousel className="carousel" >
            {
                props.products.map(product => (

                    <Carousel.Item
                        onClick={() => console.log("product")}>
                        <img

                            className="d-block "
                            src={product.img_url}
                            alt={product.name}
                        />
                        <Carousel.Caption className="">
                            <h3>{product.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
        </Carousel>

    )
}


const mapStateToProps = state => ({
    products: state.product.products
})

export default connect(mapStateToProps, { getProducts })(TopCarousel);

{/* <Carousel.Item
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
  </Carousel.Item>}*/}