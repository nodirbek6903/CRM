import { FaPlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import "./Attendance.css";
import { useState } from "react";

export default function Attendance() {
  const [selectGroupId, setSelectGroupId] = useState(1);

  const groups = [
    {
      id: 1,
      groupName: "Guruhlar hammasi",
    },
    {
      id: 2,
      groupName: "Frontend 1",
    },
    {
      id: 3,
      groupName: "Backend 4",
    },
    {
      id: 4,
      groupName: "Web Design 3",
    },
    {
      id: 5,
      groupName: "SMM Pro",
    },
    {
      id: 6,
      groupName: "Graphic Design",
    },
  ];

  const handleGroupClick = (id) => {
    setSelectGroupId(id);
  };

  return (
    <div className="attendance-container">
      <div className="attendance">
        <div className="groups-about">
          <h1>Bizda oqiydigan talabalar davomati</h1>
          <div className="groups-cards-btn">
            <div className="groups-cards-hr">
              <div className="groups-cards">
                {groups.map((group) => (
                  <span
                    className={`groups-card ${
                      selectGroupId === group.id ? "selected" : ""
                    }`}
                    key={group.id}
                    onClick={() => handleGroupClick(group.id)}
                  >
                    {group.groupName}
                  </span>
                ))}
              </div>
              <hr />
            </div>
            <button className="groups-btn">
              <FaPlus /> Guruh qoshish
            </button>
          </div>
        </div>
        <div className="groups-table-container">
          <div className="table-description">
            <div className="groups-teacher">
              <span className="teacher-about">
                Frontend 1 Guruhi Dars beruvchi: Ismoil aka
              </span>
              <button className="new-groups-btn">
                <FaPlus /> Keyingisi yaratish
              </button>
            </div>
            <div className="davomat-dates">
              <input
                type="date"
                className="start-date date-input"
                defaultValue="2021-11-08"
              />
              <span>To</span>
              <input
                type="date"
                className="end-date date-input"
                defaultValue="2021-11-08"
              />
            </div>
          </div>
          <table className="davomat-table">
            <thead>
              <tr>
                <th className="th-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" />{" "}
                  Ism Familiya
                </th>
                <th>2021-08-11</th>
                <th>2021-08-11</th>
                <th>2021-08-11</th>
                <th>2021-08-11</th>
                <th>2021-08-11</th>
                <th>2021-08-11</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" />
                  <span className="td-item">Abdurahmon Madaminov</span>
                </td>
                <td className="table-item">
                  <span className="td-item green-text">Keldi</span>
                  <input
                    type="checkbox"
                    className="davomat-change green-checkbox"
                  />
                </td>
                <td className="table-item">
                  <span className="td-item red-text">Kelmadi</span>
                  <input
                    type="checkbox"
                    className="davomat-change red-checkbox"
                  />
                </td>
                <td className="table-item">
                  <span className="td-item red-text">Kelmadi</span>
                  <input
                    type="checkbox"
                    className="davomat-change red-checkbox"
                  />
                </td>
                <td className="table-item">
                  <span className="td-item green-text">Keldi</span>
                  <input
                    type="checkbox"
                    className="davomat-change green-checkbox"
                  />
                </td>
                <td className="table-item">
                  <span className="td-item red-text">Kelmadi</span>
                  <input
                    type="checkbox"
                    className="davomat-change red-checkbox"
                  />
                </td>
                <td className="table-item">
                  <span className="td-item green-text">Keldi</span>
                  <input
                    type="checkbox"
                    className="davomat-change green-checkbox"
                  />
                </td>
              </tr>              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
