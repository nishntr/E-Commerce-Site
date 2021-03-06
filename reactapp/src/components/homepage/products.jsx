import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Container } from 'react-bootstrap'
import { addItem } from '../../actions/cart';
import { getProducts } from '../../actions/products';
import { connect } from 'react-redux'

import { Button, Card, Image } from 'semantic-ui-react'
import '../css/products.css'

function Products(props) {
    Products.propTypes = {
        products: PropTypes.array.isRequired,
        getProducts: PropTypes.func.isRequired,
        addItem: PropTypes.func.isRequired
    }
    return (
        <Container>
            <Row>

                {
                    props.products.map(product => (

                        <Col xs={6} md={4}>
                            <Card className="p-style">
                                <Image className="imgstyle" src={product.img_url} />
                                <Card.Content>
                                    <Card.Header>{product.name}</Card.Header>

                                    <Card.Description>
                                        ₹{product.price}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>

                                    {product.stock === 0 ?
                                        <Button color='teal' disabled>

                                            Out of stock
                                        </Button>
                                        :
                                        <Button color='teal' onClick={() => {
                                            props.addItem(product.id)
                                            props.getProducts()
                                            props.history.push('/cart');

                                        }}>

                                            Add to Cart
                                        </Button>}

                                </Card.Content>
                            </Card>
                        </Col>
                    ))}
            </Row>

        </Container>
    )
}

const mapStateToProps = state => ({
    products: state.product.products
})

export default connect(mapStateToProps, { addItem, getProducts })(Products);
