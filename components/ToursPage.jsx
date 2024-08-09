'use client';

import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';
import { useState } from 'react';

// 2 instances of use query - explanation
//tours page and client component
// 1. serverside prefetching - passed to client
// 2. client side ensures fresh data
// performant and responsive

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isPending } = useQuery({
    queryKey: ['tours', searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });

  return (
    <>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='enter city or country here...'
            className='input input-bordered join-item w-full'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            type='button'
            className='btn btn-primary join-item'
            disabled={isPending}
            onClick={() => setSearchTerm('')}>
            {isPending ? 'please wait' : 'Reset'}
          </button>
        </div>
      </form>

      {isPending ? <span className='loading '></span> : <ToursList data={data} />}
    </>
  );
};
export default ToursPage;
