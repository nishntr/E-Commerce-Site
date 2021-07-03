import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import { Icon, Image, List, Button, Header, Modal } from 'semantic-ui-react'

import { getOrders } from '../actions/orders'

function Orders(props) {

    const products = {};
    props.products.forEach((p) => {
        products[p.id] = p.name
    })

    useEffect(() => {
        props.getOrders()
    }, [])

    return (
        <Container className=" rounded cart-style" style={{ maxWidth: "476px" }}>
            <List ordered animated verticalAlign='middle'>
                {props.orders.map(order => {
                    console.log()
                    let namelist = ""
                    order.product.forEach((p) => { namelist += products[p] + ", " })
                    return (<List.Item>
                        <List.Content floated='right'>
                            <List.Description>
                                ₹{order.amount}
                            </List.Description>
                        </List.Content>
                        <List.Content>
                            <List.Header>{namelist}</List.Header>
                        </List.Content>
                        < hr />
                    </List.Item>)


                }
                )
                }


            </List>


        </Container>
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
