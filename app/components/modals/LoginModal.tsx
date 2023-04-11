'use client';

import { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';

import Modal from './Modal';

import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { Button } from '../Button';

import { 
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'

import { useRouter } from 'next/navigation';

import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useLoginModal } from '@/app/hooks/useLoginModal';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import axios from 'axios';
import toast from 'react-hot-toast';

function LoginModal() {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const { 
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in', {
          position: 'bottom-center'
        });

        router.refresh();

        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error, {
          position: 'bottom-center'
        });
      }
    })
  }

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <footer className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <span>First time using Airbnb?</span>

          <p
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </p>
        </div>

      </footer>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpened}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal;
