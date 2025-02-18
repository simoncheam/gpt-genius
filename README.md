<a name="readme-top"></a>

# GPTGenius 🌍✨

Y'all ready for a travel adventure? 🚗💨 Meet **GPTGenius**, your **AI-powered tour guide**, who just happens to answer all your travel questions in the **charming style of a Southern belle**. Whether you're fixin’ to find the best spots in Paris or just need a little hospitality while planning your trip, this **Next.js 14** application has got you covered!

## Live Demo 🎉

Hop on over to the live site: [GPTGenius](https://nextjs-gpt-tour-guide.vercel.app/)

---

## Table of Contents

- [About The Project 🏡](#about-the-project-)
- [Features 🚀](#features-)
- [Technologies Used 💻](#technologies-used-)
- [Getting Started 🎯](#getting-started-)
- [Usage 🏝️](#usage-️)
- [Project Structure 📂](#project-structure-)
- [Deployment 🚀](#deployment-)
- [Contributing 🤝](#contributing-)
- [License 📜](#license-)
- [Contact 📬](#contact-)
- [Acknowledgements 🌟](#acknowledgements-)

---

## About The Project 🏡

GPTGenius is a sophisticated travel companion that **blends AI-powered chat** with **customized travel itineraries** to help wanderlust-filled folks find the best places to visit.

This **delightful digital tour guide** not only dishes out **AI-generated travel tips** but does so with the **warmth of a Southern belle**. Picture it: You ask where to find the best beignets in New Orleans, and she replies, _"Well, sugar, you simply must stop by Café du Monde, bless your heart!"_ 🍩☕

With **server actions, a token-based API system, and interactive UI elements**, this app ensures a **smooth and engaging** experience for any traveler.

---

## Features 🚀

- **💬 Chat with AI** – Need travel advice? Our **Southern belle AI** has your back!
- **🗺️ AI-Powered Tour Generator** – Custom itineraries based on **your dream destinations**.
- **🔢 Token System** – Keeps track of API requests like a **proper Southern hostess** minding her guest list.
- **🔐 Secure Authentication** – Powered by **Clerk** to keep things safe and sound.
- **🎨 Theme Toggle** – Choose between **Winter and Synthwave** themes for different vibes.
- **🔍 Tour Search** – Search & filter **existing AI-generated tours**.
- **🖼️ Image Generation** – Uses the **Unsplash API** for **beautiful tour images**.
- **📱 Responsive Design** – Mobile-friendly, because **y’all should be planning trips on the go!**

---

## Technologies Used 💻

- [![Next.js][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
- [![Prisma][Prisma]][Prisma-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Clerk][Clerk]][Clerk-url]
- [![OpenAI][OpenAI]][OpenAI-url]
- [![Unsplash][Unsplash]][Unsplash-url]
- [![React Query][ReactQuery]][ReactQuery-url]
- [![Axios][Axios]][Axios-url]
- [![Vercel][Vercel]][Vercel-url]

---

## Getting Started 🎯

To get a local copy up and runnin’, follow these simple steps:

### Prerequisites

Make sure you have:

- **Node.js**
- **PostgreSQL database**
- **Clerk account** (for authentication)
- **OpenAI API key** (for the chat feature)
- **Unsplash API key** (for fetching gorgeous images)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/gptgenius.git
   cd gptgenius
   ```

````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables:

   Create a `.env.local` file and add:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   OPENAI_API_KEY=your_openai_api_key
   DATABASE_URL=your_postgresql_database_url
   UNSPLASH_API_KEY=your_unsplash_api_key
   ```

4. Set up your database:

   ```bash
   npx prisma db push
   ```

5. Start your local server:

   ```bash
   npm run dev
   ```

6. Open **`http://localhost:3000`** in your browser.

---

## Usage 🏝️

- **💬 Chat with the AI**: Find your next **vacation destination** by chatting with **our charming AI**.
- **🗺️ Generate Tours**: Let the AI **plan your trip** for you!
- **🔍 Search Tours**: Browse **existing** AI-generated tours.
- **👤 Manage Your Profile**: Check your **token balance** in **`/profile`**.
- **🎨 Change Theme**: Toggle between **Winter** and **Synthwave** themes.

---

## Project Structure 📂

```
├── app/
│   ├── (dashboard)/  # Dashboard for Chat, Profile, and Tours
│   ├── chat/         # AI Chat functionality
│   ├── profile/      # User token & profile settings
│   ├── tours/        # Tour browsing & search
│   ├── layout.js     # Main layout with Clerk authentication
│   ├── middleware.ts # Clerk authentication middleware
│   ├── providers.js  # React Query and Toaster configuration
├── components/       # UI components (Sidebar, Chat, TourInfo, etc.)
├── utils/            # Utility functions (DB actions, API calls)
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── .env.local        # Environment variables
├── next.config.js    # Next.js configuration
└── README.md         # This file, y'all! 📜
```

---

## Deployment 🚀

The project is **ready for Vercel deployment**:

1. Push your code to GitHub.
2. Connect the repository to **Vercel**.
3. Add **environment variables** in Vercel settings.
4. Click **Deploy** – easy as pecan pie! 🥧

---

## Contributing 🤝

Y’all are welcome to contribute!

1. **Fork** the repository.
2. **Create a branch** (`git checkout -b feature-name`).
3. **Commit your changes** (`git commit -m "Add new feature"`).
4. **Push to GitHub** (`git push origin feature-name`).
5. **Submit a Pull Request**.

---

## License 📜

Distributed under the **MIT License**. See **LICENSE** for details.

---

## Contact 📬

Simon Cheam - [LinkedIn][linkedin-url]

---

## Acknowledgements 🌟

- **Next.js, Clerk, Prisma, and OpenAI** for making this app possible.
- **Unsplash** for stunning images.
- **Every sweet Southern belle** for inspiring the AI’s delightful personality.
- **Y’all** for checkin’ out this project!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[linkedin-url]: https://www.linkedin.com/in/simoncheam/
````
