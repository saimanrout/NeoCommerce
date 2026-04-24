import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, savePaymentMethod, clearCartItems } from '../redux/cartSlice';
import { useCreateOrderMutation } from '../redux/ordersApiSlice';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { ShieldAlert, CreditCard } from 'lucide-react';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(cart.shippingAddress?.address || '');
  const [city, setCity] = useState(cart.shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(cart.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(cart.shippingAddress?.country || '');
  
  // Mock Payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    if (cart.cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod('MockCreditCard'));

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(async () => {
      setIsProcessing(false);
      
      // Random success/failure (80% success)
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        try {
          const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: { address, city, postalCode, country },
            paymentMethod: 'MockCreditCard',
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
          }).unwrap();
          
          dispatch(clearCartItems());
          toast.success('Payment successful! Order placed.');
          navigate(`/order/${res._id}`);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
        }
      } else {
        toast.error('Payment failed. Please try again.');
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="w-full md:w-2/3 space-y-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex items-center gap-3 text-blue-800 dark:text-blue-300">
            <ShieldAlert className="w-6 h-6 flex-shrink-0" />
            <div>
              <p className="font-bold">Demo Payment Mode Active</p>
              <p className="text-sm">This is a simulated checkout. No real charges will be made. You can use any dummy data.</p>
            </div>
          </div>

          <form onSubmit={placeOrderHandler} className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-8 h-8 text-primary-500" />
                <h2 className="text-2xl font-bold">Payment Details</h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.cartItems.length === 0 || isProcessing || isLoading}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg flex justify-center items-center gap-2 transition-colors"
            >
              {isProcessing || isLoading ? (
                <>
                  <Loader /> Processing...
                </>
              ) : (
                `Pay $${cart.totalPrice} & Place Order`
              )}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.cartItems.map((item, index) => (
              <div key={index} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                  <div className="text-sm text-gray-500">{item.qty} x ${item.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 py-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
          </div>
          
          <div className="flex justify-between font-bold text-xl py-4 border-t border-gray-200 dark:border-slate-700">
            <span>Total</span>
            <span>${cart.totalPrice}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
