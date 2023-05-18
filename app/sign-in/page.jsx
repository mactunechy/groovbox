'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (session) {
      router.replace('/music');
    }
  }, [session]);

  return (
    <div className='bg-purple-900 w-full h-screen flex justify-center items-center'>
      <div className='bg-white/10 rounded-lg w-96 h-96 p-5 flex items-center flex-col'>
        <img
          alt='logo'
          src='/assets/images/logo.svg'
          className='w-28 h-28 object-contain'
        />
        <p className='text-base text-gray-400 mt-2'>
          Sign in to your account to continue
        </p>
        {/* Create sign in with google component */}
        <div className='mt-5'>
          {/* Add an outline button */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/music' })}
            className='flex flex-row justify-center items-center bg-white/10 rounded-lg hover:bg-purple-400 hover:border-purple-500 border-2 border-gray-400 p-5'
          >
            <FcGoogle className='w-6 h-6 mr-2' />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
