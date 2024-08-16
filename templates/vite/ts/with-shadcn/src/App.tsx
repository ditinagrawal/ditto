import { Button } from "./components/ui/button";

const App = () => {
  return (
    <main className="flex flex-col gap-y-4 items-center justify-center h-screen">
      <h1 className="text-5xl font-bold text-neutral-800">
        Ditto + Vite + React + TS
      </h1>
      <p className="text-lg">
        Hello 👋, I am{" "}
        <a
          className="underline"
          href="https://ditinagrawal.netlify.app/"
          target="_blank"
        >
          Ditin
        </a>
      </p>
      <Button>Shadcn Button</Button>
    </main>
  );
};

export default App;
