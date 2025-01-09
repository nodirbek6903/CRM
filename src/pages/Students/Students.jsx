import React, { useEffect, useState } from "react";
import StudentData from "./StudentData.json";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./Student.css"

export default function Students() {
  const [students] = useState(StudentData);
  const [filter, setFilter] = useState(
    () => localStorage.getItem("studentFilter") || "offline"
  );
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    localStorage.setItem("studentFilter", filter);
  }, [filter]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleStudentsSelection = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  const DeleteSelectionStudents = () => {
    console.log(`${selectedStudents.length} ta Student o'chirildi`);
  };

  const filteredStudents =
    filter === "all"
      ? students
      : students.filter((student) => student.status === filter);

  return (
    <div className="student-container">
      <h2>Bizda o'qiydigan talabalar</h2>
      <div className="filter-components">
        <div className="component-status">
          <span
            className={filter === "offline" ? "active-filter" : ""}
            onClick={() => handleFilterChange("offline")}
          >
            Offlineda o'qiydigan talabalar
          </span>
          <span
            className={filter === "online" ? "active-filter" : ""}
            onClick={() => handleFilterChange("online")}
          >
            Onlineda o'qiydigan talabalar
          </span>
        </div>
        <hr />
      </div>
      {/* barcha componentlar uchun bir hil table */}
      <div className="component-table">
        <div className="items">
          <div className="selected-items">
            <span>
              {selectedStudents.length > 0
                ? `${selectedStudents.length} ta tanlangan`
                : ""}
            </span>
            <button
              className="deleted-btn"
              onClick={DeleteSelectionStudents}
              disabled={selectedStudents.length === 0}
            >
              <FaTrash /> O'chirish
            </button>
            <button className="created-btn">
              <FaPlus /> Qo'shish
            </button>
          </div>
          <div className="calendar-items">
            <input type="date" defaultValue="2025-01-01" />
            <span>To</span>
            <input type="date" defaultValue="2025-12-31" />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Teacher Name</th>
              <th>Field</th>
              <th>Group Name</th>
              <th>Birth Date</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentsSelection(student.id)}
                  />{" "}
                  {student.full_name}
                </td>
                <td>{student.phone_number}</td>
                <td>{student.status}</td>
                <td>{student.teacher_name}</td>
                <td>{student.field}</td>
                <td>{student.group_name}</td>
                <td>{student.birth_date}</td>
                <td>{student.registration_date}</td>
                <td>
                  <button className="dots-btn">
                    <BiDotsVerticalRounded />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
