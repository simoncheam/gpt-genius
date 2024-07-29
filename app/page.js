import Link from 'next/link';
const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        {/* //! max width on medium */}
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>GPTGenius </h1>
          <p className='py-6 text-lg leading-loose'>Your AI language assistant and more!</p>
          <Link href='/chat' className='btn btn-secondary'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
