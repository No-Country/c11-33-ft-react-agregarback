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
import FormSign from "../auth/FormSign";
import img1 from "public/google.svg";
import img2 from "public/facebook.svg";
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
      <div className="z-50 w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div>
          <div className="grid grid-cols-2 gap-2 bg-gray-50 px-4 py-8 md:px-16">
            <h3 className=" col-span-2 text-left font-display text-2xl font-bold">
              Sign In
            </h3>
            <div className="col-span-2 space-y-3">
              <span className="font-variant text-black/50">
                Enter your credentials to access your account
              </span>
              <FormSign />
            </div>
            <button
              disabled={signInClicked}
              className={`${
                signInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                  : "border border-gray-200 bg-white text-black hover:bg-gray-50"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setSignInClicked(true);
                signIn("google");
              }}
            >
              {signInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Image
                    className="space-y-2"
                    src={img1}
                    priority
                    alt="Logo google"
                    width={"15"}
                    height={"15"}
                  />
                  <p>Google</p>
                </>
              )}
            </button>
            <button
              disabled={signInClicked}
              className={`${
                signInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                  : "border border-gray-200 bg-white text-black hover:bg-gray-50"
              } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
              onClick={() => {
                setSignInClicked(true);
                signIn("facebook");
              }}
            >
              {signInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <>
                  <Image
                    className="space-y-2"
                    src={img2}
                    alt="Logo Facebook"
                    width={"15"}
                    height={"15"}
                    priority
                  />
                  <p>Facebook</p>
                </>
              )}
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
