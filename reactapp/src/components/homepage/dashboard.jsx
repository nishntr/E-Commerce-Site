import React, { Component } from 'react';

import TopCarousel from "./carousel";
import Products from './products';
import "../css/dashboard.css";

function Dashboard() {
    return (
        <React.Fragment>
            <TopCarousel />
            <Products />

        </React.Fragment>

    );
}


export default Dashboard;