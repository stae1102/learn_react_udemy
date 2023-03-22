import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const myCartItems = useSelector((state) => state.myCart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {myCartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{ title: item.name, quantity: item.quantity, total: item.totalPrice, price: item.price }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
