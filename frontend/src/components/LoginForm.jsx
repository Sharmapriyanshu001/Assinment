import React from 'react';
import Button from './Button';
import Loader from './Loader';

const LoginForm = ({ email, setEmail, onNextStep, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onNextStep();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 md:px-10 flex flex-col h-full min-h-[400px] animate-fade-in">
      <div className="flex-grow flex flex-col justify-center mb-10">
        <h2 className="text-2xl font-bold text-[#0D1B7E] mb-8 text-center sm:text-left">
          Login to your Productr Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0D1B7E] focus:border-transparent transition-all disabled:opacity-50 disabled:bg-gray-100"
              required
            />
          </div>

          <Button type="submit" className="mb-4" disabled={loading}>
            {loading ? <Loader /> : 'Login'}
          </Button>
        </form>
      </div>

      <div className="mt-auto pb-4 pt-10">
        <div className="border border-dashed border-gray-300 rounded-lg py-4 text-center">
          <p className="text-gray-500 text-sm">
            Don't have a Productr Account
          </p>
          <button type="button" className="text-[#0D1B7E] font-bold text-sm mt-1 hover:underline">
            SignUp Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
