'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  subtractTokens,
  fetchUserTokensById,
} from '@/utils/actions';
import TourInfo from './TourInfo';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/nextjs';

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  // in data we either get back tour or null
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      //! if query submitted, we want to check if in db
      const existingTour = await getExistingTour(destination);

      if (existingTour) return existingTour;

      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 300) {
        toast.error('Not enough tokens to generate a tour');
        return;
      }

      const newTour = await generateTourResponse(destination);

      if (!newTour) {
        toast.error('no matching city found...');
        return null;
      }

      const response = await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ['tours'] });

      // TODO subtract tokens
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`
       ${newTokens} tokens left
      `);

      return newTour.tour;
    },
  });

  //handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    // console.log(destination);
    mutate(destination);
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl '>
        <h2 className='mb-4'>Create Your Dream Trip With AI 🗺️ 🤖 🏝️</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            Generate Tour
          </button>
        </div>
      </form>
      <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};
export default NewTour;
