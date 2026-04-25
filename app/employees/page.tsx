"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Employee = {
  id: string;
  full_name: string;
  cedula: string;
  position: string;
  monthly_salary: number;
  status: string;
  start_date: string | null;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading employees:", error.message);
      setLoading(false);
      return;
    }

    setEmployees(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="p-10">Cargando empleados...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Empleados</h1>
      <Link href="/employees/new" className="inline-block mb-4 bg-black text-white px-4 py-2 rounded">
        + Nuevo empleado
      </Link>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nombre</th>
            <th className="border p-2 text-left">Cédula</th>
            <th className="border p-2 text-left">Cargo</th>
            <th className="border p-2 text-left">Sueldo</th>
            <th className="border p-2 text-left">Estado</th>
            <th className="border p-2 text-left">Fecha ingreso</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border p-2">{employee.full_name}</td>
              <td className="border p-2">{employee.cedula}</td>
              <td className="border p-2">{employee.position}</td>
              <td className="border p-2">${employee.monthly_salary}</td>
              <td className="border p-2">{employee.status}</td>
              <td className="border p-2">{employee.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}