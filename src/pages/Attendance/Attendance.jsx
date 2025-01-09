import { useState } from "react";
import "./Attendance.css";
import DavomatData from "./DavomatData.json"
import { FaPlus } from "react-icons/fa";

export default function Attendance() {
  const [selectionDirection, setSelectionDirection] = useState("")
  const [selectedGroup,setSelectedGroup] = useState(null)
  const [attendanceData,setAttendanceData] = useState([])


  // direction tanlash
  const handleDirectionChange = (e) => {
    const directionId = e.target.value
    setSelectionDirection(directionId)
    setSelectedGroup(null)
  }

  // guruh tanlash
  const handleGroupChange = (e) => {
    const groupId = e.target.value
    
    const direction = DavomatData.directions.find((d) => d.id.toString() === selectionDirection)
    
    const group = direction.groups.find((g) => g.id.toString() === groupId)
    setSelectedGroup(group)
    setAttendanceData(group.students)
  }

  // davomat o'zgartirish f-siya si

  const handleAttendanceChange = (studentId, date, status) => {
    setAttendanceData((prev) =>
    prev.map((student) => 
    student.id === studentId 
    ? {
      ...student,
      attendance: student.attendance.map((record) =>
      record.date === date ? {...record, status} : record
      ),
    }
    : student
    )
    );
  };

  return (
    <div className="attendance-container">
      <h2>Bizda o'qiydigan talabalar davomati</h2>

      <div>
        <label htmlFor="">Yo'nalish tanlang:</label>
        <select name="direction" id="" value={selectionDirection} onChange={handleDirectionChange}>
          <option value="">Tanlang</option>
          {DavomatData?.directions?.map(direction => (
            <option key={direction.id} value={direction.id}>
              {direction.name}
            </option>
          ))}
        </select>
      </div>

      {selectionDirection && (
        <div>
          <label htmlFor="Guruh">Guruh Tanlang: </label>
          <select name="group" id="group" value={selectedGroup?.id || ""} onChange={handleGroupChange}>
            <option value="">Tanlang</option>
            {
            DavomatData.directions
            .find((d) => d.id.toString() === selectionDirection)
            .groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))
            }
          </select>
        </div>
      )}

      {
        selectedGroup && (
          <div>
          <div className="create-group-teacher">
          <h2 className="teacher-name">O'qituvchi: {selectedGroup.teacher}</h2>
          <button className="create-group-btn"><FaPlus /> Guruh Qo'shish</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone Number</th>
                <th>Lesson Type</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {
                attendanceData.map((student) => (
                  <tr key={student.id}>
                    <td>{student.full_name}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.lesson_type}</td>
                    <td>
                      {
                      student.attendance.map((record,index) => (
                        <div key={index} style={{marginBottom: "5px"}}>
                          <span>{record.date}: </span>
                          <select name="status" id="" value={record.status} onChange={(e) => handleAttendanceChange(student.id, record.date, e.target.value)}>
                            <option value="Keldi">Keldi</option>
                            <option value="Kelmadi">Kelmadi</option>
                          </select>
                        </div>
                      ))
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          </div>
        )
      }
    </div>
  );
}
