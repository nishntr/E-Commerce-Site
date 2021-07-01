import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

export const Checkout = (props) => {
    return (
        <div>
            <form action="https://test.payu.in/_payment" method="post">
                <input type="hidden" name="key" value="{{key}}" />
                <input type="hidden" name="txnid" value="{{txnid}}" />
                <input type="hidden" name="amount" value="{{amount}}" />
                <input type="hidden" name="productinfo" value="{{product}}" />
                <input type="hidden" name="firstname" value="{{name}}" />
                <input type="hidden" name="email" value="{{email}}" />
                <input type="hidden" name="surl" value="{{surl}}" />
                <input type="hidden" name="hash" value="{{hash}}" />
                <input type="submit" />
            </form>
        </div>
    )
}

// Checkout.propTypes = {
//     props: PropTypes
// }

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
