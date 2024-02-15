import { CheckCircleIcon, MailIcon } from '@heroicons/react/outline';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [greeting, setGreeting] = useState('');

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/server/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowListings = useCallback(async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/server/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }, [currentUser._id]);

  useEffect(() => {
    handleShowListings();
  }, [handleShowListings]);

  useEffect(() => {
    const fecha = new Date();
    const hora = fecha.getHours();

    if (hora >= 6 && hora < 12) {
      setGreeting('Buen día');
    } else if (hora >= 12 && hora < 19) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }
  }, []);

  return (
    <section className="lg:pl-64 flex flex-col flex-1">
      <div className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Greeting */}
                <div className="flex items-center">
                  <img
                    className="hidden h-16 w-16 sm:block"
                    src="/dog.svg"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 sm:hidden"
                        src="/dog.svg"
                        alt=""
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {greeting}, {currentUser.username}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dd className="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                        <MailIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {currentUser.email}
                      </dd>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        Cuenta verificada
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditProfile />
        {/* Pinned projects */}
        <div className="border-t border-gray-200 m-2">
          <div className="px-4 py-6 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Mis añadidos
            </h3>
            {userListings && userListings.length > 0 ? (
              <>
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2 mt-4"
                >
                  {userListings.map((animal) => (
                    <li
                      key={animal._id}
                      className="relative col-span-1 flex shadow-sm rounded-md h-[80px]"
                    >
                      <div className="flex-shrink-0 w-16 h-full flex items-center justify-center">
                        <img
                          src={animal.image}
                          alt="imagen"
                          className="h-full w-full rounded-l-md"
                        />
                      </div>

                      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                          <p className="text-gray-900 font-medium">
                            {animal.description}
                          </p>
                          <div className="flex flex-row">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 text-gray-500 mt-0.5 mr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                              />
                            </svg>
                            <p className="text-gray-500">{animal.location}</p>
                          </div>
                        </div>
                        <Menu as="div" className="flex-shrink-0 pr-2">
                          <Menu.Button className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                              />
                            </svg>
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`/mascota-en-adopcion/${animal._id}`}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      Ver más
                                    </Link>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link
                                      to={`/editar-publicacion/${animal._id}`}
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm cursor-pointer'
                                      )}
                                    >
                                      Editar
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-sm cursor-pointer'
                                      )}
                                    >
                                      <button
                                        onClick={() =>
                                          handleListingDelete(animal._id)
                                        }
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="my-4 text-sm font-medium text-gray-700">
                {showListingsError
                  ? 'Hubo un error al mostrar tus añadidos.'
                  : 'No has añadido mascotas en adopción.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
