import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex-1 py-8 lg:pl-64">
      <div className="px-4 sm:px-6 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <form className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 lg:text-xl">
                Crea tu cuenta
              </h3>
              <p className="mt-1 text-md text-gray-500">
                ¿Ya tienes una cuenta?
                <Link
                  to="/iniciar-sesion"
                  className="ml-1 font-semibold hover:text-gray-600"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    autoComplete="name"
                    className="block py-2 px-3 w-full bg-white rounded-md text-sm border border-gray-300 focus:outline-cyan-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    autoComplete="email"
                    className="block py-2 px-3 w-full bg-white rounded-md text-sm border border-gray-300 focus:outline-cyan-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    required
                    className="block py-2 px-3 w-full bg-white rounded-md text-sm border border-gray-300 focus:outline-cyan-600"
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2 text-gray-600"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeIcon className="w-4 h-4" />
                    ) : (
                      <EyeOffIcon className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex flex-col justify-center md:flex-row md:justify-end">
              <button className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                Continuar con Google
              </button>
              <button className="mt-3 ml-0 md:mt-0 md:ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm md:text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none">
                Registrarme
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
