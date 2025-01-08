import React, { useState } from 'react'
import { FaPlus, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import "./Courses.css"

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState("1");
  
    const handleCourseClick = function (id) {
      setSelectedCourse(id);
    };
  return (
    <div className='courses-container'>
      Kurslar
    </div>
  )
}
