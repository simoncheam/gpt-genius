'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getExistingTour, generateTourResponse, createNewTour } from '@/utils/actions';
import TourInfo from './TourInfo';
import toast from 'react-hot-toast';

const NewTour = () => {
  const queryClient = useQueryClient();

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

      const newTour = await generateTourResponse(destination);

      if (!newTour) {
        toast.error('no matching city found...');
        return null;
      }
      const response = await createNewTour(newTour);
      console.log(response);

      queryClient.invalidateQueries({ queryKey: ['tours'] });
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
        <h2 className='mb-4'>Select your destination</h2>
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
