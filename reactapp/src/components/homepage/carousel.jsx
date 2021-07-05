import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Carousel from 'react-bootstrap/Carousel'
import { connect } from 'react-redux'
import { getProducts } from '../../actions/products';
import { addItem } from '../../actions/cart';

function TopCarousel(props) {
    TopCarousel.propTypes = {
        products: PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired
    }

    useEffect(() => {
        props.getProducts()
    }, [])

    return (
        <Carousel className="carousel m-3" >
            {
                props.products.map(product => (

                    <Carousel.Item onClick={() => {
                        props.history.push('/cart')
                        props.addItem(product)
                    }}>
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

export default connect(mapStateToProps, { getProducts, addItem })(TopCarousel);
