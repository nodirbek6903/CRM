import React, { useState } from "react";
import paymentData from "./PaymentsData.json";
import "./Payment.css";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Payments() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Tanlangan guruh asosida talabalarni olish

  const getFilteredStudents = () => {
    if (selectedGroup === "all") {
      return paymentData.groups.flatMap((group) =>
        group.students.map((student) => ({
          ...student,
          group_name: group.group_name,
          teacher_name: group.teacher_name,
        }))
      );
    } else {
      const group = paymentData.groups.find(
        (group) => group.group_name === selectedGroup
      );
      return group
        ? group.students.map((student) => ({
            ...student,
            group_name: group.group_name,
            teacher_name: group.teacher_name,
          }))
        : [];
    }
  };

  const filteredStudents = getFilteredStudents();

  // Talabalarni tanlash uchun checkbox boshqaruvi
  const handleCheckboxChange = (student_id) => {
    if (selectedStudents.includes(student_id)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== student_id));
    } else {
      setSelectedStudents([...selectedStudents, student_id]);
    }
  };

  // Tanlangan talabalarni o'chirish funksiyasi
  const handleDelete = () => {
    const remainingStudents = filteredStudents.filter(
      (student) => !selectedStudents.includes(student.student_id)
    );
    setSelectedStudents([]);
    console.log("Deleted students:", selectedStudents); // Log qilish
    console.log("Remaining students:", remainingStudents); // Log qilish
  };

  return (
    <div className="payment-container">
      <h1>To'lov analizi</h1>

      {/* Guruhlarni filtrlash tugmalari */}
      <div className="filter-components">
        <div className="component-status">
          <span
            onClick={() => setSelectedGroup("all")}
            className={`${selectedGroup === "all" && "active-filter"}`}
          >
            Guruhlar hammasi
          </span>
          {paymentData.groups.map((group) => (
            <span
              key={group.id}
              className={`${
                selectedGroup === group.group_name && "active-filter"
              }`}
              onClick={() => setSelectedGroup(group.group_name)}
            >
              {group.group_name}
            </span>
          ))}
        </div>
        <hr />
      </div>

      {/* Guruh va o'qituvchi haqida ma'lumot */}
      {selectedGroup !== "all" && (
        <div className="group-info">
          <h2>Guruh nomi: {selectedGroup}</h2>
          <p>
            Dars beruvchi:{" "}
            <span>
              {
                paymentData.groups.find(
                  (group) => group.group_name === selectedGroup
                )?.teacher_name
              }
            </span>
          </p>
        </div>
      )}

      {/* Talabalar jadvali */}
      <div className="table-container">
        <div className="items">
          <div className="selected-items">
            {selectedStudents.length > 0 && (
              <span>{selectedStudents.length} ta tanlandi</span>
            )}
            <button className="deleted-btn" onClick={handleDelete}>
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
              <th>F.I.SH</th>
              <th>Telefon raqami</th>
              <th>Qo'shimcha raqam</th>
              <th>To'lov holati</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.student_id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.student_id)}
                    onChange={() => handleCheckboxChange(student.student_id)}
                  />{" "}
                  {student.student_name}
                </td>
                <td>{student.phone_number}</td>
                <td>{student.otherPhone_number}</td>
                <td
                  style={{
                    color:
                      student.payment_status === "To'lov qildi"
                        ? "green"
                        : "red",
                  }}
                >
                  {student.payment_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
