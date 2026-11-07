# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a8ecb399-5835-43b3-88ca-7c7324615269

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a8ecb399-5835-43b3-88ca-7c7324615269) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

The site is hosted on **Cloudflare Pages** (project `egor-website`) at https://egor.website/.
DNS for `egor.website` is managed in Cloudflare; mail (MX) still goes to Beget.

Every push to the `release` branch triggers `.github/workflows/deploy-cloudflare-pages.yml`,
which builds the app and uploads `dist/` with Wrangler.

Required GitHub repository secrets:

- `CLOUDFLARE_API_TOKEN` — API token with the **Account → Cloudflare Pages → Edit** permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

Custom domains are attached in the Cloudflare dashboard: Workers & Pages → `egor-website` → Custom domains.

To serve the site from a sub-path instead of a domain root, build with `VITE_BASE=/<path>/`.
