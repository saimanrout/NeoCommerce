import { useGetAdminStatsQuery } from '../../redux/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetAdminStatsQuery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
              <div className="p-4 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-2xl">
                <DollarSign className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-500 rounded-2xl">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-500 rounded-2xl">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Products</p>
                <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-center gap-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-2xl">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Low Stock Alerts</h2>
            {stats.lowStock.length === 0 ? (
              <Message variant="success">All products are adequately stocked.</Message>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900/50">
                      <th className="py-4 px-6 font-semibold">Product Name</th>
                      <th className="py-4 px-6 font-semibold">Stock Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.lowStock.map(product => (
                      <tr key={product._id} className="border-b border-gray-100 dark:border-slate-700 last:border-0">
                        <td className="py-4 px-6 text-sm">{product.name}</td>
                        <td className="py-4 px-6 text-sm text-red-500 font-bold">{product.countInStock} remaining</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
