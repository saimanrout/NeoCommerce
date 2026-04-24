import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Trash2, ArrowRight } from 'lucide-react';
import Message from '../components/Message';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/shop" className="font-bold underline ml-2">Go Back To Shop</Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-2xl" />
                <div className="flex-grow text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="text-xl font-bold hover:text-primary-500 transition-colors">
                    {item.name}
                  </Link>
                  <div className="text-lg font-semibold text-gray-500 mt-2">${item.price.toFixed(2)}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item._id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-slate-700 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span className="font-semibold">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
            </div>
            
            <button
              type="button"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
              className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
            >
              Proceed To Checkout <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
