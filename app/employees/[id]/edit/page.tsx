"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const [fullName, setFullName] = useState("");
  const [cedula, setCedula] = useState("");
  const [position, setPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [startDate, setStartDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchEmployee = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .eq("id", employeeId)
      .single();

    if (error) {
      console.error("Error loading employee:", error.message);
      setLoading(false);
      return;
    }

    setFullName(data.full_name || "");
    setCedula(data.cedula || "");
    setPosition(data.position || "");
    setMonthlySalary(String(data.monthly_salary || ""));
    setStartDate(data.start_date || "");
    setPhone(data.phone || "");
    setEmail(data.email || "");
    setAddress(data.address || "");

    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("employees")
      .update({
        full_name: fullName,
        cedula,
        position,
        monthly_salary: Number(monthlySalary),
        start_date: startDate,
        phone,
        email,
        address,
        updated_at: new Date().toISOString(),
      })
      .eq("id", employeeId);

    if (error) {
      console.error("Error updating employee:", error.message);
      alert("Error: " + error.message);
      setSaving(false);
      return;
    }

    router.push(`/employees/${employeeId}`);
  };

  if (loading) {
    return <div className="p-10">Cargando empleado...</div>;
  }

  return (
    <div className="p-10 max-w-xl">
      <Link href={`/employees/${employeeId}`} className="text-blue-600 underline">
        ← Volver
      </Link>

      <h1 className="text-2xl font-bold my-6">Editar empleado</h1>

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
          disabled={saving}
          className="bg-black text-white p-2 rounded"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}