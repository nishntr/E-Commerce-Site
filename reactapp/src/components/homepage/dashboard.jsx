import React, { } from 'react';

import TopCarousel from "./carousel";
import Products from './products';
import Checkout from '../checkout/checkout';
import "../css/dashboard.css";

function Dashboard() {
    return (
        <React.Fragment>
            <TopCarousel />
            <Products />
            <Checkout />

        </React.Fragment>

    );
}


export default Dashboard;