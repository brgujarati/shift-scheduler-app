import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import IDCard from "../../components/employees/IDCard";

export default function EmpList() {
  const { employees } = useAuth();

  const rows = [];
  for (let i = 0; i < employees.length; i += 2) {
    rows.push([employees[i], employees[i + 1]]);
  }

  return (
    <div className="p-6 space-y-6">
      {rows.map((pair, idx) => (
        <div key={idx} className="flex gap-6">
          <div className="flex-1">{pair[0] && <IDCard emp={pair[0]} />}</div>
          <div className="flex-1">
            {pair[1] ? <IDCard emp={pair[1]} /> : <div className="h-full" />}
          </div>
        </div>
      ))}
    </div>
  );
}
