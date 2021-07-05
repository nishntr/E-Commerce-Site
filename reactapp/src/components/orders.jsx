import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Badge } from 'react-bootstrap'
import { Image, Item } from 'semantic-ui-react'

import { getOrders } from '../actions/orders'
import './css/main.css'

function Orders(props) {


    useEffect(() => {
        props.getOrders()
    }, [])

    return (
        <div style={{ marginTop: "30px" }}>
            {props.orders.map(order => {
                console.log()
                let products = []
                order.product.map(id => {
                    products.push(
                        props.products.find((p) => p.id === id))
                })
                props.products.filter((p) => order.product.includes(p.id))
                console.log(products)
                return (
                    <Container className=" rounded order-style" style={{ maxWidth: "476px" }}>
                        {products.map((p) => (
                            <div style={{ display: "flex", maxWidth: "100%" }}>
                                <Image className="img-order" src={p.img_url} />
                                <Item style={{ width: "100%" }}>

                                    <Item.Content>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>

                                            <Item.Header >{p.name}</Item.Header>
                                            <Item.Meta>
                                                <span className='stay'>{order.date.slice(0, 10)}</span>
                                            </Item.Meta>
                                        </div>


                                        <Item.Extra>
                                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                                                <Item.Description>₹{p.price}</Item.Description>
                                                {order.status ?
                                                    <><Badge variant="success">Ordered</Badge></> :
                                                    <><Badge variant="warning">Cancelled</Badge></>}


                                            </div>
                                        </Item.Extra>
                                    </Item.Content>
                                    <hr />
                                </Item></div>
                        ))}

                    </Container>)


            }
            )
            }

        </div>


    )
}

Orders.propTypes = {
    orders: PropTypes.array.isRequired,
    getOrders: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    orders: state.orders.orders,
    products: state.product.products
})



export default connect(mapStateToProps, { getOrders })(Orders)
