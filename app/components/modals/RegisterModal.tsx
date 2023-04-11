'use client';

import { useCallback, useState } from 'react';

import Modal from './Modal';

import { Heading } from '../Heading';
import { Input } from '../inputs/Input';
import { Button } from '../Button';

import { 
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form'

import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useLoginModal } from '@/app/hooks/useLoginModal';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { signIn } from 'next-auth/react';

import axios from 'axios';
import toast from 'react-hot-toast';

function RegisterModal() {
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
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        toast.success('Account created!', {
          position: 'bottom-center'
        });
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error('Something went wrong!', {
          position: 'bottom-center',
        });
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
          <span>Already have an account?</span>

          <p
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </p>
        </div>

      </footer>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpened}
      title="Login"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal;
