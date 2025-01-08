import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./Courses.css";
import CoursesData from "./Courses.json";

export default function Courses() {
  const [courses, setCourses] = useState(CoursesData);
  const [filter, setFilter] = useState("all");
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleCourseSelection = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id)
        ? prev.filter((courseId) => courseId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectionCourses = () => {
    // setCourses((prev) =>
    //   prev.filter((course) => !selectedCourses.includes(course.id))
    // );
    console.log(`${selectedCourses.length} ta kurs o'chirildi`)
  };

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.status === filter);

  return (
    <div className="courses-container">
      <h2>Bizda bor kurslar</h2>
      <div className="filter-courses">
        <div className="courses-status">
          <span
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => handleFilterChange("all")}
          >
            Barcha kurslar
          </span>
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
              {/* <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked
                    ? setSelectedCourses(
                        filteredCourses.map((course) => course.id)
                      )
                    : setSelectedCourses([])
                }
                checked={
                  selectedCourses.length === filteredCourses.length &&
                  filteredCourses.length > 0
                }
              />{" "} */}
              {selectedCourses.length > 0
                ? `${selectedCourses.length} ta tanlangan`
                : "Hech narsa tanlanmagan"}
            </span>
            <button
              className="deleted-btn"
              onClick={deleteSelectionCourses}
              disabled={selectedCourses.length === 0}
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
              <th>Direction</th>
              <th>Lesson Time</th>
              <th>Topic</th>
              <th>Lesson Days</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Students Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => handleCourseSelection(course.id)}
                  />{" "}
                  {course.direction}
                </td>
                <td>{course.lesson_time}</td>
                <td>{course.topic}</td>
                <td>{course.lesson_days.join(", ")}</td>
                <td>{course.status}</td>
                <td>{course.start_date}</td>
                <td>{course.students_count}</td>
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
