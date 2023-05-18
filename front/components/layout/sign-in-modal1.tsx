import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { FaFacebook, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
  email: yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

interface FormValues {
  email: string;
  password: string;
  rememberUser: boolean;
}

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const handleRememberUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberUser(event.target.checked);
  };

  const handleLogin = (data: FormValues) => {
    // Aquí podrías implementar la lógica para hacer el login con los datos del formulario
    // y guardar la información del usuario si el check de "recordar usuario" está activado
  };


  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(handleLogin)} className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email')}
            className={`border-gray-400 border-2 rounded-lg p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password')}
            className={`border-gray-400 border-2 rounded-lg p-2 w-full ${errors.password ? 'border-red-500' : ''}`}
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberUser"
            name="rememberUser"
            checked={rememberUser}
            onChange={handleRememberUserChange}
            className="mr-2"
          />
          <label htmlFor="rememberUser" className="text-gray-700 font-bold">
            Recordar usuario
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Iniciar sesión
        </button>
      </form>
      <div className="mt-4">
        <hr className="border-gray-400 w-full mb-4" />
        <div className="flex justify-center items-center">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full mr-2">
            <FaGoogle className="inline-block mr-2" />
            Google
          </button>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full mr-2">
            <FaFacebook className="inline-block mr-2" />
            Facebook
          </button>
          <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-full">
            <FaMicrosoft className="inline-block mr-2" />
            Microsoft
          </button>
        </div>
      </div>
    </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}

