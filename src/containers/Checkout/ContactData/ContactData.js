import React, { Component } from 'react';

import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: {
                    street: this.state.street,
                    zipcodoe: this.state.zipcodoe,
                },
                email: this.state.email,
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
        <form>
            <input type="text" className={classes.Input} name="name" placeholder="Your name"></input>
            <input type="text" className={classes.Input} name="email" placeholder="Your email"></input>
            <input type="text" className={classes.Input} name="street" placeholder="Street"></input>
            <input type="text" className={classes.Input} name="postalCode" placeholder="Postal Code"></input>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;