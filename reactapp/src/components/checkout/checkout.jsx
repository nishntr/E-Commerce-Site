import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

export const Checkout = (props) => {
    return (
        <div>
            <form action="https://test.payu.in/_payment" method="post">
                <input type="hidden" name="key" value={props.order.key} />
                <input type="hidden" name="txnid" value={props.order.txnid} />
                <input type="hidden" name="amount" value={props.order.amount} />
                <input type="hidden" name="productinfo" value={props.order.product} />
                <input type="hidden" name="firstname" value={props.order.name} />
                <input type="hidden" name="email" value={props.order.email} />
                <input type="hidden" name="surl" value={props.order.surl} />
                <input type="hidden" name="hash" value={props.order.hash} />
                <input type="submit" />
            </form>
        </div>
    )
}

Checkout.propTypes = {
    order: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    order: state.orders.currentOrder
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(Checkout)
