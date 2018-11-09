import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl key={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)} 
            removed={() => props.ingredientRemove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            label={ctrl.label}/>
        })}
        <button disabled={!props.purchaseable} 
        className={classes.OrderButton}
        onClick={props.ordered}>ORDER NOW</button>
        
    </div>
);

export default buildControls