import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice + priceAddition

        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
        this.updatePurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount === 0 ? 0 : oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice - priceDeduction

        this.setState({ingredients:updatedIngredients, totalPrice:newPrice})
        this.updatePurchaseable(updatedIngredients);
    }

    updatePurchaseable(ingredients) {
        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key]
        }).reduce((sum, el) => {
            return sum + el;
        },0);

        this.setState({purchaseable: sum > 0})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients    
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return (
            
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients}></OrderSummary>
                </Modal>
                <Burger ingredients= {this.state.ingredients}></Burger>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemove={this.removeIngredientHandler} 
                disabled={disabledInfo}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}
                purchaseable={this.state.purchaseable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;