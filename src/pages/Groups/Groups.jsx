import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./Groups.css";
import GroupsData from "./Groups.json"

export default function Groups() { 
  const [groups] = useState(GroupsData)
  const [filter,setFilter] = useState(() => localStorage.getItem("groupFilter") || "offline")
  const [selectedGroups,setSelectedGroups] = useState([])


  useEffect(() => {
    localStorage.setItem("groupFilter",filter)
  },[filter])

  const handleFilterChange = (status) => {
    setFilter(status)
  }

  const handleGroupsSelection = (id) => {
    setSelectedGroups((prev) => 
    prev.includes(id) ? prev.filter((groupId) => groupId !== id ) : [...prev, id]
  )
  }

  const deleteSelectionGroups = () => {
    console.log(`${selectedGroups.length} ta guruh o'chirildi`)
  };

  const filteredGroups =
   filter === "all" ? 
   groups : groups.filter((group) => group.status === filter)

  return (
    <div className="groups-container">
      {/* <div className="all-groups-cards"></div> */}
      <h2>Bizning Guruhlarimiz</h2>
      <div className="filter-components">
        <div className="component-status">
          <span
            className={filter === "offline" ? "active-filter" : ""}
            onClick={() => handleFilterChange("offline")}
          >
            Offline kurslar
          </span>
          <span
            className={filter === "online" ? "active-filter" : ""}
            onClick={() => handleFilterChange("online")}
          >
            Online kurslar
          </span>
        </div>
        <hr />
      </div>
      {/* barcha componentlar uchun bir hil table */}
            <div className="component-table">
              <div className="items">
                <div className="selected-items">
                  <span>
                    {selectedGroups.length > 0
                      ? `${selectedGroups.length} ta tanlangan`
                      : ""}
                  </span>
                  <button
                    className="deleted-btn"
                    onClick={deleteSelectionGroups}
                    disabled={selectedGroups.length === 0}
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
                    <th>Group Name</th>
                    <th>Direction</th>
                    <th>Lesson Start Time</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Students Count</th>
                    <th>Teacher Name</th>
                    {filter === "online" ? "" : <th>Room Number</th>}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGroups.map((group) => (
                    <tr key={group.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedGroups.includes(group.id)}
                          onChange={() => handleGroupsSelection(group.id)}
                        />{" "}
                        {group.group_name}
                      </td>
                      <td>{group.direction}</td>
                      <td>{group.lesson_start_time}</td>
                      <td>{group.created_date}</td>
                      <td>{group.status}</td>
                      <td>{group.students_count}</td>
                      <td>{group.teacher_name}</td>
                      {filter === "online" ? "" : <td>{group.room_number}</td>}
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
