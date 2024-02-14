import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/user/userSlice';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/server/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Inicio de sesión con Google fallido', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm md:text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
    >
      Continuar con Google
    </button>
  );
};

export default OAuth;
