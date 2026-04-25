"use client";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const addEmployee = async () => {
    const { data, error } = await supabase
      .from("employees")
      .insert([
        {
          full_name: "Juan Pérez",
          cedula: "1720000000",
          position: "Vendedor",
          monthly_salary: 500,
          start_date: "2026-04-25",
          status: "active",
        },
      ])
      .select();

    if (error) {
      console.error("SUPABASE ERROR:", JSON.stringify(error, null, 2));
      alert("Error: " + error.message);
      return;
    }

    console.log("EMPLOYEE CREATED:", data);
    alert("Empleado creado");
  };

  return (
    <div className="p-10">
      <button
        onClick={addEmployee}
        className="bg-black text-white p-3 rounded"
      >
        Add Employee
      </button>
    </div>
  );
}