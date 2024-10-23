import React, { useState } from "react";
import "./Groups.css";

export default function Groups() {
  const [condition, setCondition] = useState("all");

  const groups = [
    { name: "Frontend 1", count: 16, type: "online", time: "14:00", startDate: "2024-09-10" },
    { name: "Backend 4", count: 20, type: "offline", time: "10:00", startDate: "2024-08-15" },
    { name: "Web Design 3", count: 12, type: "online", time: "16:00", startDate: "2024-07-25" },
    { name: "SMM Pro", count: 5, type: "offline", time: "09:00", startDate: "2024-10-01" },
    { name: "Graphic Design", count: 10, type: "online", time: "11:00", startDate: "2024-09-20" },
  ];

  const filteredGroups = groups.filter(group =>
    condition === "all" ? true : group.type === condition
  );

  return (
    <div className="groups-container">
      <div className="groups-cards">
        {groups.map((group, index) => (
          <span key={index} className="groups-card">
            <span className="group-name">{group.name}</span>
            <span className="group-items">{group.count} ta guruh</span>
          </span>
        ))}
      </div>

      <div className="groups-tables">
        <span className="group-title">Bizning guruhlarimiz</span>
        <div className="groups-condition">
          <div className="group-filter">
            <span className={`condition-btn ${condition === "all" ? "active" : ""}`} onClick={() => setCondition("all")}>Hammasi</span>
            <span className={`condition-btn ${condition === "online" ? "active" : ""}`} onClick={() => setCondition("online")}>Online</span>
            <span className={`condition-btn ${condition === "offline" ? "active" : ""}`} onClick={() => setCondition("offline")}>Offline</span>
          </div>
        <hr />
        </div>
        <table className="groups-table">
          <thead>
            <tr>
              <th>Guruh nomi</th>
              <th>O'quvchilar soni</th>
              <th>Dars vaqti</th>
              <th>Boshlanish sanasi</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group, index) => (
              <tr key={index}>
                <td><input type="checkbox" /> {group.name}</td>
                <td>{group.count} ta o'quvchi</td>
                <td>{group.time}</td>
                <td>{group.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
