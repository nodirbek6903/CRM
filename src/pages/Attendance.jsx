import { FaPlus } from "react-icons/fa6";
import "./Attendance.css";

export default function Attendance() {
  return (
    <div className="attendance-container">
      <div className="attendance">
        <div className="groups-about">
          <h1>Bizda oqiydigan talabalar davomati</h1>
          <div className="groups-cards-btn">
            <div className="groups-cards-hr">
              <div className="groups-cards">
                <span className="groups-card">Guruhlar hammasi</span>
                <span className="groups-card">Frontend 1</span>
                <span className="groups-card">Backend 4</span>
                <span className="groups-card">Web Design 3</span>
                <span className="groups-card">SMM Pro</span>
                <span className="groups-card">Graphic Design</span>
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
              <span className="teacher-about">Frontend 1 Guruhi Dars beruvchi: Ismoil aka</span>
              <button className="new-groups-btn">
                <FaPlus /> Keyingisi yaratish
              </button>
            </div>
            <div className="davomat-dates">
              <input type="date" className="start-date date-input" value="2021-11-08" />
              <span>To</span>
              <input type="date" className="end-date date-input" value="2021-11-08" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
