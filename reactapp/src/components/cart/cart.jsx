import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from '../../actions/orders'
import { Container } from 'react-bootstrap'
import { Icon, Image, List, Button, Header, Modal } from 'semantic-ui-react'
import { Pay } from './pay'

import '../css/auth.css';

function Cart(props) {

    const payRef = useRef();

    let total = 0;
    let ids = [];
    let namelist = "";

    props.items.forEach((item) => {
        total += Number(item.price)
    });
    props.items.forEach((item) => {
        ids.push(item.id)
    })
    props.items.forEach((item) => {
        namelist += item.name + ", "
    })

    // let chk = async () => {
    //     props.checkout(ids, total, namelist);
    //     return true;
    // }



    return (
        <div>
            <Container className=" rounded cart-style" style={{ maxWidth: "476px" }}>
                <List animated verticalAlign='middle'>
                    {props.items.map(item => (
                        <List.Item>
                            <Image avatar src={item.img_url} />
                            <List.Content>
                                <List.Header>{item.name}</List.Header>
                            </List.Content>
                            <List.Content floated='right'>
                                <List.Description>
                                    ₹{item.price}
                                </List.Description>
                            </List.Content>

                        </List.Item>
                    )
                    )
                    }
                    <hr />
                    <List.Item>
                        <List.Content floated='right'>
                            ₹{total}
                        </List.Content>
                        <Icon name="money bill alternate outline" />
                        <List.Content>Total</List.Content>
                    </List.Item>

                    <List.Item>
                        <List.Content floated='right'>
                            <Button
                                onClick={async () => {
                                    let res = await props.checkout(ids, total, namelist);
                                    console.log(res)
                                    payRef.current.show()

                                }
                                } color='green' animated>
                                <Button.Content visible>Checkout</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>


                        </List.Content>
                    </List.Item>

                </List>


            </Container>
            <Pay className="modal" {...props} ref={payRef} />
        </div>

    )
}


Cart.propTypes = {
    items: PropTypes.array.isRequired,
    checkout: PropTypes.func.isRequired,
    order: PropTypes.array.isRequired

}

const mapStateToProps = state => ({
    items: state.cart.items,
    order: state.orders.currentOrder
})

export default connect(mapStateToProps, { checkout })(Cart)

