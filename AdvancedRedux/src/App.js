import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

import { fetchCartData, sendCartData } from './store/mycart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const myCart = useSelector((state) => state.myCart);
  const myNotification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (myCart.changed) {
      dispatch(sendCartData(myCart));
    }
  }, [myCart, dispatch]);

  return (
    <Fragment>
      {myNotification && <Notification {...myNotification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
