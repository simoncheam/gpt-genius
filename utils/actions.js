'use server';

import OpenAI from 'openai';
import prisma from './db';
import { revalidatePath } from 'next/cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [...chatMessages],
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 100,
    });
    return { message: response.choices[0].message, tokens: response.usage.total_tokens };
  } catch (error) {
    return null;
  }
};

// get tour response

export const generateTourResponse = async ({ city, country }) => {
  const resCharLimit = 200;
  //construct query
  const query = `Find a ${city} in this ${country}.
If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}.
Once you have a list, create a one-day tour. Response should be in the following JSON format:
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "description of the city and tour",
    "stops": [
    "Describe stop 1 in less than ${resCharLimit} characters",
    "Describe stop 2 in less than ${resCharLimit} characters",
    "Describe stop 3 in less than ${resCharLimit} characters"]
  }
}
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a tour guide' },
        { role: 'user', content: query },
      ],
      model: 'gpt-4o-mini',
      temperature: 0,
    });

    // if we cannot find city, return null
    const tourData = JSON.parse(response.choices[0].message.content);
    if (!tourData.tour) {
      return null;
    }
    // return tourdata and tokens
    return { tour: tourData.tour, tokens: response.usage.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }
};

//get existing tour

export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

//create a new tour
export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

// find tours by search terms: city or country
export const getAllTours = async (searchTerm) => {
  //returns existing tours for loading page
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    });
    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  });
  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};

//generate image
export const generateTourImage = async ({ city, country }) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `A scenic panoramic view of ${city}, ${country}`,
      n: 1,
      size: '512x512',
    });
    return tourImage?.data?.images[0]?.url;
  } catch (error) {
    return null;
  }
};

//get tokens by id
export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });
  return result?.tokens;
};

//Generate user tokens for Id
export const generateUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

// runs fetch, then generate tokens if none associated
export const fetchOrGenerateTokens = async (clerkId) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) {
    return result.tokens;
  }

  return (await generateUserTokensForId(clerkId)).tokens;
};

//functionality to subtract tokens

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  // show tokens - revalidate path
  revalidatePath('/profile');
  return result.tokens;
};
