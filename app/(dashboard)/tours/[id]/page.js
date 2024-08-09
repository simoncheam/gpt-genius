import { getSingleTour } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TourInfo from '@/components/TourInfo';

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  // console.log('🚀 ~ SingleTourPage ~ tour:', tour);

  if (!tour) {
    redirect('/tours');
  }

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        Back to all tours
      </Link>

      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
