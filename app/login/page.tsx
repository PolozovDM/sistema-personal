export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sistema de Personal
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}