import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { imageToBase64 } from '../utils/imageToBase64';

const AddPet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: '',
    image: '',
  });

  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.items) {
      if (e.dataTransfer.items[0].kind === 'file') {
        const file = e.dataTransfer.items[0].getAsFile();
        uploadImage(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async (file) => {
    const data = await imageToBase64(file);
    setFormData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleChange = (e) => {
    if (e.target.type === 'radio') {
      setFormData({ ...formData, category: e.target.value });
    }
    if (e.target.type === 'textarea' || e.target.type === 'text') {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/server/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/mascota-en-adopcion/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className="flex-1 py-8 lg:pl-64">
      <div className="px-4 sm:px-6 lg:px-8 lg:max-w-6xl lg:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Añade mascotas en adopción
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-1">
                <span className="mb-2 block text-sm font-medium text-gray-700">
                  Imagen
                </span>
                {formData.image ? (
                  <label htmlFor="image">
                    <img
                      src={formData.image}
                      className="h-20 w-20 rounded-full overflow-hidden object-cover "
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      id="image"
                      name="image"
                      className="hidden"
                      onChange={(e) => uploadImage(e.target.files[0])}
                    />
                  </label>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick}
                  >
                    <label htmlFor="image">
                      <span className="inline-block h-20 w-20 rounded-full overflow-hidden bg-white">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          id="image"
                          name="image"
                          className="hidden"
                          onChange={(e) => uploadImage(e.target.files[0])}
                        />
                        <svg
                          className="h-full w-full text-gray-300 flex flex-col"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          <text
                            x="50%"
                            y="90%"
                            textAnchor="middle"
                            fill="black"
                            fontSize="0.2em"
                          >
                            Añadir
                          </text>
                        </svg>
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Animal
                </label>
                <div className="mt-2 space-y-4 space-x-0 flex flex-col md:flex-row md:space-y-0 md:space-x-4 ">
                  <div className="flex items-center">
                    <input
                      id="category"
                      name="category"
                      type="radio"
                      value="perro"
                      checked={formData.category === 'perro'}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-3 block text-sm font-medium text-gray-700">
                      Perro/a
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category"
                      name="category"
                      type="radio"
                      value="gato"
                      checked={formData.category === 'gato'}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-3 block text-sm font-medium text-gray-700">
                      Gato/a
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category"
                      name="category"
                      type="radio"
                      value="conejo"
                      checked={formData.category === 'conejo'}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-3 block text-sm font-medium text-gray-700">
                      Conejo/a
                    </span>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="category"
                      name="category"
                      type="radio"
                      value="otro"
                      checked={formData.category === 'otro'}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="ml-3 block text-sm font-medium text-gray-700">
                      Otro/a
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    onChange={handleChange}
                    value={formData.description}
                    className="shadow-sm block w-full py-3 px-2 text-sm border border-gray-300 rounded-md focus:outline-cyan-600"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ubicación
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    onChange={handleChange}
                    value={formData.location}
                    className="block py-2 px-3 w-full bg-white rounded-md text-sm border border-gray-300 focus:outline-cyan-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-center md:justify-end">
              <button
                disabled={loading}
                className="py-2 px-4 w-full md:w-[20%] border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none"
              >
                {loading ? 'Cargando...' : 'Añadir'}
              </button>
            </div>
          </div>
        </form>
        {error && <p className="mt-6 text-sm text-red-800">{error}</p>}
      </div>
    </main>
  );
};

export default AddPet;
