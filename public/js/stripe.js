/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const stripe = Stripe('pk_test_51JXDSaL1vcnKjlRS0W0b5kDf4VJ6ach5DeJQ7dC8U4AwTEMXODOonVmS5XPJaxcQTCkuHubZxhtLbObdOLVTqlpt005HXMpdA6');
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
