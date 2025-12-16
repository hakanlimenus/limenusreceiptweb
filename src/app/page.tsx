//lets remove home page and if we need we can add later
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      {/* <img src="/limenus-logo.svg" alt="Limenus Logo" className="w-24 h-24 mb-4" /> */}
      <h1 className="text-2xl font-bold">Limenus'a Hoş Geldiniz</h1>
      <p className="text-gray-600 mt-2 max-w-md">
        Fişlerinizi dijital olarak görüntüleyin, kampanyalardan faydalanın ve sürdürülebilir alışverişin keyfini çıkarın.
      </p>
    </main>
  );
}