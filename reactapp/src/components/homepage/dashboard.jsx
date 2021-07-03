import React, { } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react'

import TopCarousel from "./carousel";
import Products from './products';
import "../css/dashboard.css";

function Dashboard() {
    return (
        <React.Fragment>
            <TopCarousel />
            <ProductDivider />
            <Products />

        </React.Fragment>

    );
}


const ProductDivider = () => (
    <Divider horizontal>
        <Header as='h4'>
            <Icon name='th large' />
            Products
        </Header>
    </Divider>
)


export default Dashboard;