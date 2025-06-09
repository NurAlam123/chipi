# Chipi - Frontend

Chipi is a lightweight, responsive and modern chatbot frontend built with **SvelteKit**. It communicates with the [Chipi - backend]() via API.

![Chipi](./static/chipi_showcase.gif)

## 🛠️ Tech Stack

- [Svelte](https://svelte.dev/)
- [SvelteKit](https://kit.svelte.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## 🚀 Features

- Real-time text streaming from backend API
- Clean and minimalistic chatbot interface
- Tailwind-powered responsive layout
- Fast performance thanks to Svelte’s reactivity

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nuralam123/chipi.git
cd chipi
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### 3. Configure API endpoint

Update the API endpoint in `vite.config.ts` file:

```env
target: 'http://localhost:8000',
```

### 4. Run the development server

```bash
npm run dev
# or
yarn run dev
# or
bun run dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173) to see Chipi in action!

## 📄 License

This project is under [MIT LICENSE](LICENSE)
