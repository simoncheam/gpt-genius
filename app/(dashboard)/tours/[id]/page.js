import { getSingleTour, generateTourImage } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TourInfo from '@/components/TourInfo';
import Image from 'next/image';
import axios from 'axios';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  // console.log('🚀 ~ SingleTourPage ~ tour:', tour);

  if (!tour) {
    redirect('/tours');
  }
  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });

  // unsplash API approach to generate image
  const { data } = await axios.get(`${url}${tour.city}`);
  const tourImage = await data?.results[0]?.urls?.raw;
  console.log('🚀 ~ SingleTourPage ~ tourImage:', tourImage);

  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        Back to all tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            priority
            alt={tour.title}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
