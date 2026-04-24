import { useGetMyOrdersQuery } from '../redux/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">ORDER ID</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">DATE</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">TOTAL</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">PAID</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">DELIVERED</th>
                <th className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">{order._id}</td>
                  <td className="py-4 px-6 text-sm">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-4 px-6 text-sm font-bold">${order.totalPrice}</td>
                  <td className="py-4 px-6 text-sm">
                    {order.isPaid ? (
                      <span className="text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs font-bold">{order.paidAt.substring(0, 10)}</span>
                    ) : (
                      <span className="text-red-500 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full text-xs font-bold">No</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {order.isDelivered ? (
                      <span className="text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full text-xs font-bold">{order.deliveredAt.substring(0, 10)}</span>
                    ) : (
                      <span className="text-red-500 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full text-xs font-bold">No</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-right">
                    <Link to={`/order/${order._id}`} className="text-primary-500 hover:text-primary-600 font-bold hover:underline">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
