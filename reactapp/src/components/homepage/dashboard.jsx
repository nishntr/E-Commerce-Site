import React, { } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react'

import TopCarousel from "./carousel";
import Products from './products';
import "../css/dashboard.css";

function Dashboard(props) {
    return (
        <React.Fragment>
            <TopCarousel {...props} />
            <ProductDivider />
            <Products {...props} />

        </React.Fragment>

    );
}


const ProductDivider = () => (
    <Divider horizontal style={{ marginTop: "40px" }}>
        <Header as='h4'>
            <Icon name='th large' />
            Products
        </Header>
    </Divider>
)


export default Dashboard;