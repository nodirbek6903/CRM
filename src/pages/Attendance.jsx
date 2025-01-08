import { FaPlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
import "./Attendance.css";
import { useState } from "react";

export default function Attendance() {
  const [selectGroupId, setSelectGroupId] = useState(1);



  return (
    <div className="attendance-container">
      <div className="attendance">
        Attandance
      </div>
    </div>
  );
}
