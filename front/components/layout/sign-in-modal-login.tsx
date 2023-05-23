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
import FormSign from "./authForm/FormSign";
import Balancer from "react-wrap-balancer";


const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 px-4 py-8 md:px-16">
          <h3 className=" col-span-2 text-left font-display text-2xl font-bold">
            Login
          </h3>
          <div className="col-span-2 space-y-3">
            <span className="font-roboto text-black/50">Enter your credentials to access your account</span>
          <FormSign />
          </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export function useLoginInModal() {
  const [showLoginInModal, setShowLoginInModal] = useState(false);

  const LoginInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showLoginInModal}
        setShowSignInModal={setShowLoginInModal}
      />
    );
  }, [showLoginInModal, setShowLoginInModal]);

  return useMemo(
    () => ({ setShowLoginInModal: setShowLoginInModal, LoginInModal: LoginInModalCallback }),
    [setShowLoginInModal, LoginInModalCallback],
  );
}
