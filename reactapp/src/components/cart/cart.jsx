import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux';
import { checkout, deleteOrder, checkStock } from '../../actions/orders'
import { getProducts } from '../../actions/products'
import { clearCart, addCartItem } from '../../actions/cart'
import { Container } from 'react-bootstrap'
import { Icon, Image, List, Button } from 'semantic-ui-react'
import { Pay } from './pay'


import '../css/main.css';

function Cart(props) {

    const payRef = useRef();
    const [total, setTotal] = useState(0);
    const [ids, setIds] = useState([]);
    const [namelist, setNamelist] = useState("[]");
    const [stockCheck, setStockCheck] = useState(true)

    const dispatch = useDispatch();


    useEffect(() => {
        var cartItems = [];
        console.log(props.items)
        console.log(props.products)
        cartItems = props.products.filter(pd => props.items.includes(pd.id)) //select products whose id are in cart


        // console.log(cartItems)
        cartItems.forEach((item) => {
            console.log(item)
            props.addCartItem(item.id, {
                "name": item.name,
                "price": item.price,
                "stock": item.stock,
                "img_url": item.img_url
            })
        })


    }, [props.products])

    useEffect(() => {
        props.getProducts()

    }, [])

    useEffect(() => {
        console.log(props.cartItems)
        let total = 0
        let ids = []
        let names = ""
        Object.entries(props.cartItems).map(([k, v]) => {
            if (v.stock === 0) {
                setStockCheck(false)
            }
            total += Number(v.price);
            ids.push(k);
            names += v.name + ", "

        })
        console.log(ids)
        setTotal(total)
        setIds(ids)
        setNamelist(names)
    }, [props.cartItems])




    // let chk = async () => {
    //     props.checkout(ids, total, namelist);
    //     return true;
    // }

    const notEmpty = (

        <div>
            <Container className=" rounded cart-style" style={{ maxWidth: "476px" }}>
                <List animated verticalAlign='middle'>

                    <Icon style={{ fontSize: "2em", marginBottom: "8px" }} name="shopping cart" />

                    {
                        Object.entries(props.cartItems).map(([k, v]) => (
                            <List.Item key={k}>
                                <Image avatar src={v.img_url} />
                                <List.Content>
                                    <List.Header>
                                        <p>
                                            {v.name}

                                            {v.stock === 0 ? <text style={{ color: "red" }}> Out of Stock</text> : ""}
                                        </p>

                                    </List.Header>
                                </List.Content>
                                <List.Content floated='right'>
                                    <List.Description>
                                        ₹{v.price}

                                    </List.Description>
                                </List.Content>

                            </List.Item>
                        ))
                    }

                    <hr />
                    <List.Item>
                        <List.Content floated='right'>
                            ₹{total}
                        </List.Content>
                        <Icon name="money bill alternate outline" />
                        <List.Content>Total</List.Content>
                    </List.Item>
                    <br />
                    <List.Item>
                        <List.Content floated='left'>
                            <Button floated="right" color="purple" onClick={() => props.history.push('/')} >Explore</Button>

                        </List.Content>
                        <List.Content floated='right'>
                            <Button
                                onClick={() => props.clearCart()} color='grey' animated>
                                <Button.Content visible>Clear</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='delete' />
                                </Button.Content>
                            </Button>
                            <Button disabled={!stockCheck}
                                onClick={async () => {
                                    if (props.order === null) {
                                        console.log("false")
                                    }
                                    else {
                                        // check stock, then useeffect for checkout
                                        let stock = await props.checkStock(ids)
                                        if (stock) {
                                            props.checkout(ids, total, namelist);
                                            payRef.current.show()
                                        } else {
                                            console.log("Out of stock items in cart")
                                        }
                                    }
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
    );

    const forEmpty = (
        <Container className=" rounded cart-style" style={{ maxWidth: "476px" }}>
            <List animated verticalAlign='middle'>
                <Icon style={{ fontSize: "2em", marginBottom: "8px" }} name="shopping cart" />

                <List.Item>
                    <Icon name="smile outline" />
                    <List.Content >
                        <List.Header>Wow, So Empty...</List.Header>
                    </List.Content>

                </List.Item>
                <hr />
                <List.Item>
                    <Button floated="right" color="purple" onClick={() => props.history.push('/')} >Explore</Button>
                </List.Item>
            </List>


        </Container>
    );


    return <>
        {props.items.length === 0 ? forEmpty : notEmpty}
    </>

}


Cart.propTypes = {
    items: PropTypes.array.isRequired,
    checkout: PropTypes.func.isRequired,
    checkStock: PropTypes.func.isRequired,
    order: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    addCartItem: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    items: state.cart.items,
    cartItems: state.cart.cartItems,
    products: state.product.products,
    order: state.orders.currentOrder
})


export default connect(mapStateToProps, { checkout, checkStock, getProducts, addCartItem, clearCart, deleteOrder })(Cart)

