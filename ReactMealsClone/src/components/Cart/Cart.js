import Modal from '../UI/Modal';
import CartItem from './CartItem';

import classes from './Cart.module.css';

const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 1, name: 'Sushi', amount: 1, price: 15.99 }].map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
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
