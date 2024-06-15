import { FaPlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
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
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Ism Familiya
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
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
              <tr className="table-items">
                <td className="table-item td-familiya-ism">
                  <PiDotsThreeOutlineVerticalThin className="table-dots-icon" /> Abdurahmon Madaminov
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Kelmadi <input type="checkbox" className="davomat-change" />
                </td>
                <td className="table-item">
                  Keldi <input type="checkbox" className="davomat-change" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
