"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TerminateEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const [employeeName, setEmployeeName] = useState("");
  const [endDate, setEndDate] = useState("");
  const [terminationReason, setTerminationReason] = useState("");
  const [terminationObservation, setTerminationObservation] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchEmployee = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("full_name, status")
      .eq("id", employeeId)
      .single();

    if (error) {
      console.error("Error loading employee:", error.message);
      setLoading(false);
      return;
    }

    setEmployeeName(data.full_name || "");
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
        status: "inactive",
        end_date: endDate,
        termination_reason: terminationReason,
        termination_observation: terminationObservation,
        updated_at: new Date().toISOString(),
      })
      .eq("id", employeeId);

    if (error) {
      console.error("Error terminating employee:", error.message);
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

      <h1 className="text-2xl font-bold my-6">
        Terminar relación laboral
      </h1>

      <div className="border rounded p-4 mb-6 bg-gray-50">
        <p>
          Empleado: <strong>{employeeName}</strong>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Esta acción no elimina al empleado. Solo cambia su estado a inactive.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span>Fecha de salida</span>
          <input
            className="border p-2 rounded"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <textarea
          className="border p-2 rounded"
          placeholder="Motivo de salida"
          value={terminationReason}
          onChange={(e) => setTerminationReason(e.target.value)}
          required
        />

        <textarea
          className="border p-2 rounded"
          placeholder="Observaciones"
          value={terminationObservation}
          onChange={(e) => setTerminationObservation(e.target.value)}
        />

        <button
          type="submit"
          disabled={saving}
          className="bg-red-600 text-white p-2 rounded"
        >
          {saving ? "Guardando..." : "Terminar relación laboral"}
        </button>
      </form>
    </div>
  );
}