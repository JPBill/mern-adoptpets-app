import { CheckCircleIcon, MailIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from '../components/EditProfile';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [greeting, setGreeting] = useState('');

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
      </div>
    </section>
  );
};

export default Profile;
