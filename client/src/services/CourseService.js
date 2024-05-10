const API_URL = 'http://localhost:5050/courses';

const CourseService = {
    getCourses: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        return response.json();
    },

    getCourseById: async (id) => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }
        return response.json();
    },

    createCourse: async (courseData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) {
            throw new Error('Failed to create course');
        }
        return response.json();
    },

    updateCourse: async (id, courseData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseData),
        });
        if (!response.ok) {
            throw new Error('Failed to update course');
        }
        return response.json();
    },

    deleteCourse: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete course');
        }
    },
};

export default CourseService;
