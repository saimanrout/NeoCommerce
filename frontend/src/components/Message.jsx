import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const Message = ({ variant = 'info', children }) => {
  const styles = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    danger: 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle2 className="w-5 h-5" />,
    danger: <AlertCircle className="w-5 h-5" />,
  };

  return (
    <div className={`p-4 rounded-xl border flex items-center gap-3 ${styles[variant]}`}>
      {icons[variant]}
      <div className="font-medium">{children}</div>
    </div>
  );
};

export default Message;
