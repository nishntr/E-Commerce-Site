import React, { Component, useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Modal } from 'semantic-ui-react'
import { clearCart } from '../../actions/cart';
import { connect } from 'react-redux'

export const Pay = forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);

    useImperativeHandle(
        ref,
        () => ({
            show() {
                setOpen(true)
            }
        }),
    )

    return (
        <div>

            <Modal
                size="tiny"

                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Select Payment Option</Modal.Header>
                <Modal.Content image>
                    <Modal.Description style={{ paddingLeft: "7%" }}>
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                        <label class="form-check-label" for="gridRadios2">
                            <img style={{ height: "30%", width: "30%" }} src="https://seeklogo.com/images/P/payu-logo-C104D0EC9F-seeklogo.com.png"
                                alt="PayU" />
                        </label>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <form action="https://test.payu.in/_payment" id="form" method="post">
                        <input type="hidden" name="key" value={props.order.key} />
                        <input type="hidden" name="txnid" value={props.order.txnid} />
                        <input type="hidden" name="amount" value={props.order.amount} />
                        <input type="hidden" name="productinfo" value={props.order.product} />
                        <input type="hidden" name="firstname" value={props.order.name} />
                        <input type="hidden" name="email" value={props.order.email} />
                        <input type="hidden" name="surl" value={props.order.surl} />
                        <input type="hidden" name="hash" value={props.order.hash} />
                    </form>
                    <Button color='black' onClick={() => {
                        setOpen(false);

                    }}>
                        Cancel
                    </Button>

                    <Button

                        content="Pay"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {

                            console.log(document.forms[0])

                            if (document.getElementById("gridRadios2").checked) {
                                document.forms[0].submit();
                                props.clearCart()
                                setOpen(false);
                            }
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )


})

Pay.propTypes = {
    order: PropTypes.array.isRequired,
    clearCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    order: state.orders.currentOrder
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps, { clearCart })(Pay)
