import Register from "@/components/forms/Register";

export default function Home() {
  return (
    <main className="flex h-screen max-h-screen">
      <div className="container my-auto">
        <div className="sub-container max-w-[496px]">
          <Register />
        </div>
      </div>
    </main>
  );
}
