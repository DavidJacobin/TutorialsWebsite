const Course = require("../models/Course");


async function getAllByDate() {
    return Course.find({}).sort({ createdAt: 1 }).lean();
};

async function getRecent() {
    return Course.find({}).sort({ userCount: -1 }).limit(3).lean();
};


async function createCourse(course) {
    return Course.create(course);
};

async function getById(id){
    return Course.findById(id).lean();
};

async function deleteById(id){
    return Course.findByIdAndDelete(id)
};

async function updateById(id,data){
    return Course.findByIdAndUpdate(id,data)
};

async function enrollUser(courseId, userId){
    const existing = await Course.findById(courseId);

    existing.userCount++;

    existing.users.push(userId);
    return existing.save();
}



module.exports = {
    getAllByDate,
    createCourse,
    getRecent,
    getById,
    deleteById,
    updateById,
    enrollUser

}