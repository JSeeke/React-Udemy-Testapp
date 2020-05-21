import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

import axios from '../../axios-orders';

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();
  
    const ings = useSelector(state => {
      return state.burgerBuilder.ingredients;
    });
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
  
    const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = ingName =>
      dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(
      () => dispatch(actions.initIngredients()),
      [dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
  
    useEffect(() => {
      onInitIngredients();
    }, [onInitIngredients]);

    const isPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => {
        setPurchasing(true);
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabedInfo = {
        ...ings
    }
    for (let key in disabedInfo) {
        disabedInfo[key] = disabedInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (error) {
        burger = <p>Ingredients can't be loaded!</p>;
    }

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls 
                price={totalPrice}
                ingredientAdded={onIngredientAdded} 
                ingredientRemoved={onIngredientRemoved}
                purchaseable={isPurchasable(ings)}
                ordered={purchaseHandler}
                disabled={disabedInfo}/>
            </Aux>
        );
        orderSummary = <OrderSummary 
            ingredients={ings}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} 
            price={totalPrice}/>
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default (withErrorHandler(burgerBuilder, axios));