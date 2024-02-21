import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckIcon,
  LinkIcon,
  LocationMarkerIcon,
  SparklesIcon,
} from '@heroicons/react/outline';

const PetDetails = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categoryFeatures, setCategoryFeatures] = useState([]);
  const [copied, setCopied] = useState(false);

  const params = useParams();

  const features = {
    perro: [
      {
        id: 1,
        text: 'Los perros son conocidos por su lealtad hacia sus dueños y familias.',
      },
      {
        id: 2,
        text: 'Suelen ser muy juguetones y les encanta interactuar con las personas.',
      },
      { id: 3, text: 'Son fácilmente entrenables.' },
      {
        id: 4,
        text: ' Tienden a ser protectores de su territorio y de quienes los cuidan.',
      },
    ],
    gato: [
      {
        id: 1,
        text: 'Los gatos son generalmente más independientes que los perros y pueden pasar tiempo solos sin problemas.',
      },
      { id: 2, text: 'Son muy higiénicos y pasan mucho tiempo acicalándose.' },
      {
        id: 3,
        text: 'Son ágiles y tienen la capacidad de trepar y saltar a alturas impresionantes.',
      },
      {
        id: 4,
        text: 'Pueden comunicarse a través de diferentes sonidos y expresiones corporales, como ronronear, maullar y fruncir el ceño.',
      },
    ],
    conejo: [
      { id: 1, text: 'Los conejos son animales sociales.' },
      { id: 2, text: 'Tienen una dieta herbívora.' },
      {
        id: 3,
        text: 'Son excelentes saltadores y pueden hacerlo tanto para moverse como para expresar emoción.',
      },
    ],
    otro: [
      { id: 1, text: 'Requiere una atención especial y constante.' },
      { id: 2, text: 'La dieta puede variar según la especie.' },
      { id: 3, text: 'En búsqueda de un hogar.' },
    ],
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/server/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
        const categoryFeatures = features[data.category] || features.otro;
        setCategoryFeatures(categoryFeatures);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  console.log(loading);

  const navigate = useNavigate();
  return (
    <main className="lg:pl-64">
      {loading && <p>Cargando...</p>}
      {error && <p>Algo salio mal...</p>}
      {listing && !loading && !error && (
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="lg:max-w-lg lg:self-end">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(-1)}
                className="text-xs text-gray-500 hover:text-gray-900"
              >
                Volver atrás
              </button>
              <ArrowLeftIcon className="w-4 h-4 ml-2 flex-shrink-0 text-gray-400" />
            </div>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="capitalize">{listing.category}</span> en
                adopción
              </h1>
            </div>

            <div className="mt-4">
              <div className="flex items-center text-xs text-gray-500">
                {listing.views <= 1
                  ? `${listing.views} Vista`
                  : `${listing.views} Vistas `}

                <div className="ml-4 pl-4 border-l border-gray-300">
                  {copied ? (
                    <div className="flex items-center">
                      <CheckIcon className="h-4 w-4 mr-2 inline-flex" />
                      <p className="">¡Copiado!</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 2000);
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <p className="text-xs text-gray-500 hover:text-gray-600">
                        <LinkIcon className="h-4 w-4 mr-2 inline-flex" />
                        Copiar enlace
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <section className="mt-4">
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-600">{listing.description}</p>
              </div>

              <div className="mt-6 flex flex-col items-start">
                {categoryFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center py-2">
                    <SparklesIcon
                      className="flex-shrink-0 inline-block h-5 w-5 text-cyan-500"
                      aria-hidden="true"
                    />
                    <p className="ml-2 text-sm text-gray-500">{feature.text}</p>
                  </div>
                ))}
                <div className="flex items-center py-2">
                  <LocationMarkerIcon
                    className="flex-shrink-0 inline-block h-5 w-5 text-cyan-600"
                    aria-hidden="true"
                  />
                  <p className="ml-2 text-sm text-gray-500">
                    {listing.location}.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="rounded-lg overflow-hidden">
              <img
                src={listing.image}
                alt="Mascota en adopción"
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-cyan-500"
                  >
                    Contactar
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </main>
  );
};

export default PetDetails;
