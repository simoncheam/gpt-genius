'use server';

import OpenAI from 'openai';
import prisma from './db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [...chatMessages],
      model: 'gpt-4o-mini',
      temperature: 0,
    });
    console.log(response.choices[0].message);
    // console.log(response);
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

// get tour response

export const generateTourResponse = async ({ city, country }) => {
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
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
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
    return tourData.tour;
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
      id
    },
  })
}