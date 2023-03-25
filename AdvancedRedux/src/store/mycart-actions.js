import { uiActions } from './ui-slice';
import { myCartActions } from './mycart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const resposne = await fetch(
        'https://react-http-10279-default-rtdb.firebaseio.com/cart.json'
      );

      if (!resposne.ok) {
        throw new Error('Could not fetch cart data');
      }

      const data = await resposne.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(myCartActions.replaceCart(cartData));
    } catch (error) {
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      });
    }
  };
};

export const sendCartData = (myCart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-10279-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(myCart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
