# Memorybase

Memorybase is a Vue3 project. It's a memory game wherein players select a memory theme and then find pairs of two to win.

There are two types of memory supported:
- **Normal memory games**, where players find pairs of identical cards
- **Associative memory**, where players find unique cards that share some kind of connection.

The memory games are configured inside of /src/data. Games that do not have an associated pairs.json are automatically normal memory games.

## Demo

Play the game at [https://schatt3npakt.github.io/memorybase/](https://schatt3npakt.github.io/memorybase/)

## Getting Started

Make sure you are running the supported node version
 ```bash
 nvm use
 ```

Install dependencies, run the dev server. Done! 🎊 

```bash
cd memorybase
npm i
npm run dev
```