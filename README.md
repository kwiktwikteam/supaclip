# Vid-B-Web
This is a product for creators to instantly create a landing page for their videos. And it also provides a custom chat support for your videos which answers users questions in real time.

## TODOS
- [x] Initialize project (w/ t3-stack)
- [x] Upload to github (w/ github)
- [x] Deploy to vercel (w/ vercel)
- [x] Builing Mockup UI
  - [x] Create Landing Page
  - [x] Creator Page (for users to see all creator videos)
  - [x] Video Landing Page (for users to see a specific video)
  - [ ] Make the page editable (for creators to edit the video transcript and resources)
- [x] Initialize database
- [x] Add authentication (w/ next-auth)
- [x] Chatbot functionality
- [ ] Multitenancy (Feature for creators)
  - [ ] DB schema profile (new/ table)
  - [ ] Vercel Domain Configuration
    - [ ] Add server actions for vercel domain add
    - [ ] Domain remove
    - [ ] Domain update
  - [ ] Middleware Redirection
    - [x] Initial redirection (without validation of domain) 
    - [ ] Validatiting custom domains w/ users 
  - [ ] Custom page for custom domains
    - [x] Home page
    - [ ] Creator Page
    - [ ] Vid page


## Getting Started (DEV)
if you don't have pnpm installed, run `npm install -g pnpm`

1. Clone the repo
2. Run `pnpm install`
3. Create a `.env` file in the root directory and add the following variables:
```
DATABASE_URL=<your database url>
NEXT_AUTH_URL=<your secret>
```
4. Run `pnpm start`
5. Open `http://localhost:3000` in your browser

