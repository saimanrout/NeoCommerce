import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
    </div>
  );
};

export default Loader;
