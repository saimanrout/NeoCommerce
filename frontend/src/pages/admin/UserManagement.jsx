import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Trash2, Edit, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                <th className="py-4 px-6 font-semibold">ID</th>
                <th className="py-4 px-6 font-semibold">NAME</th>
                <th className="py-4 px-6 font-semibold">EMAIL</th>
                <th className="py-4 px-6 font-semibold text-center">ADMIN</th>
                <th className="py-4 px-6 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="py-4 px-6 text-sm">{user._id}</td>
                  <td className="py-4 px-6 text-sm font-medium">{user.name}</td>
                  <td className="py-4 px-6 text-sm"><a href={`mailto:${user.email}`} className="text-primary-500 hover:underline">{user.email}</a></td>
                  <td className="py-4 px-6 text-sm flex justify-center">
                    {user.isAdmin ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm text-right">
                    <button className="text-primary-500 hover:text-primary-600 p-2">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteHandler(user._id)} className="text-red-500 hover:text-red-600 p-2 ml-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
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

export default UserManagement;
