"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Employee = {
  id: string;
  full_name: string;
  cedula: string;
  position: string;
  monthly_salary: number;
  phone: string | null;
  email: string | null;
  address: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  termination_reason: string | null;
};

export default function EmployeeProfilePage() {
  const params = useParams();
  const employeeId = params.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

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

    setEmployee(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando empleado...</div>;
  }

  if (!employee) {
    return <div className="p-10">Empleado no encontrado</div>;
  }

  return (
    <div className="p-10 max-w-2xl">
      <Link href="/employees" className="text-blue-600 underline">
        ← Volver
      </Link>

      <h1 className="text-2xl font-bold mt-6 mb-4">
        {employee.full_name}
      </h1>

      <div className="border rounded p-4 flex flex-col gap-2">
        <p><strong>Cédula:</strong> {employee.cedula}</p>
        <p><strong>Cargo:</strong> {employee.position}</p>
        <p><strong>Sueldo mensual:</strong> ${employee.monthly_salary}</p>
        <p><strong>Teléfono:</strong> {employee.phone || "-"}</p>
        <p><strong>Email:</strong> {employee.email || "-"}</p>
        <p><strong>Dirección:</strong> {employee.address || "-"}</p>
        <p><strong>Fecha ingreso:</strong> {employee.start_date || "-"}</p>
        <p><strong>Fecha salida:</strong> {employee.end_date || "-"}</p>
        <p><strong>Estado:</strong> {employee.status}</p>
        <p><strong>Motivo salida:</strong> {employee.termination_reason || "-"}</p>
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          href={`/employees/${employee.id}/edit`}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Editar
        </Link>

        {employee.status === "active" && (
          <Link
            href={`/employees/${employee.id}/terminate`}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Terminar relación laboral
          </Link>
        )}
      </div>
    </div>
  );
}