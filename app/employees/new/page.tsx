"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewEmployeePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [cedula, setCedula] = useState("");
  const [position, setPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("employees").insert([
      {
        full_name: fullName,
        cedula,
        position,
        monthly_salary: Number(monthlySalary),
        start_date: startDate,
        phone,
        email,
        address,
        status: "active",
      },
    ]);

    if (error) {
      console.error("Error creating employee:", error.message);
      alert("Error: " + error.message);
      setLoading(false);
      return;
    }

    router.push("/employees");
  };

  return (
    <div className="p-10 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Nuevo empleado</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Cargo"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Sueldo mensual"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded"
        >
          {loading ? "Guardando..." : "Guardar empleado"}
        </button>
      </form>
    </div>
  );
}