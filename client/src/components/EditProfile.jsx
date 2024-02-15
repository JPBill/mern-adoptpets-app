import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="flex-1 py-8">
      <div className="px-4 sm:px-6 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <form className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Editar perfil
              </h3>
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
                    defaultValue={currentUser.username}
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
                    defaultValue={currentUser.email}
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
            <div className="flex justify-center md:justify-end">
              <button className="w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 md:w-[20%] hover:bg-cyan-700 focus:outline-none">
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
