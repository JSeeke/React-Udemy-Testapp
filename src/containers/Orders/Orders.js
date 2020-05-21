import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props => {
    const {onFetchOrders} = props;

    useEffect(() => {
        onFetchOrders();
    }, onFetchOrders);

    let orders = <Spinner />;
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order 
                key={order.id} 
                ingredients={order.ingredients} 
                price={+order.price}/>
        ))
    }
    return(
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return{
        orders: state.orders.orders,
        loading: state.orders.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));