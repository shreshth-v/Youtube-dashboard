const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google`;
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to the YouTube Dashboard</h1>
        <p className="text-gray-400">Please login with Google to continue</p>
        <button
          onClick={handleGoogleLogin}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg font-medium"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
