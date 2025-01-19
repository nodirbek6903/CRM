const Course = require("../models/Course")

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body)
        await course.save()
        res.status(201).json(course)
    } catch (error) {
        res.status(400).json({ message: 'Failed to create course', error });
    }
}

const updateCourse = async (req, res) => {
    const {id} = req.params

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedCourse){
            return res.status(404).json({ message: 'Course not found'})
        }
        res.status(200).json(updatedCourse)
    } catch (error) {
        res.status(400).json({ message: 'Failed to update course', error });
    }
}

const deleteCourse = async (req,res) => {
    const {id} = req.params

    try {
        const deletedCourse = await Course.findByIdAndDelete(id)
        if(!deletedCourse){
            return res.status(404).json({ message: 'Course not found'})
        }
        res.status(200).json({message: 'Course successfully deleted'})
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course', error });   
    }
}

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse
}