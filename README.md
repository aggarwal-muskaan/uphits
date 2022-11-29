## About 🎶

A full-stack music web-app inspired from Spotify's consumer app.  
I've explored backend database schemas and migrations, API calls with serverless functions while developing **uphits**.

## Install & run

```
git clone https://github.com/aggarwal-muskaan/uphits.git
cd uphits
npm install
npm run dev
```

#### Setup Database

Create Postgres DB on [Heroku](https://www.heroku.com/), [Fly.io](https://fly.io/), etc and copy the database connection string.  
Store it in `.env` file :

```
DATABASE_URL = ${connection_string}
```

For running seed script & locally launching [Prisma](https://www.prisma.io/docs/concepts/components/prisma-studio) studio, run commands:

```
npx prisma db seed
npx prisma studio
```

## Demo

https://user-images.githubusercontent.com/54470292/204520983-ab442c02-cb49-485f-b2fe-a47cc2b7fee2.mp4

Try live demo using these creds -  
Email : test@gmail.com  
Password : password

## Features

- Play/pause, repeat/shuffle, back/next songs.
- Modify volume using seek bar.
- Signup/Login using browser cookies sent by jwt.
- View collection of different Artists & Playlist (displayed using SSR).





## Upcoming Features

- Create playlists
- Like a song

## Known Issues

- Songs/Images fetched from Google drive doesn't load sometimes due to Google unusual traffic error.  
  ( workaround: can try after clearing cache or accessing website in incognito mode )
- Sliding on the Music seek bar results in the flickering of sound.  
  ( clicking on seekbar works fine though )

## Tech stack

**Frontend**: Next.js  
**Database**: Postgres  
**ORM**: Prisma  
**Component Library**: Chakra-UI  
**State Management**: easy-peasy
