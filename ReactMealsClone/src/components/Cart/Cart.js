import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const { items } = cartCtx;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onCloseCart}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
