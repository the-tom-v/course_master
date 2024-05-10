import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseListPage from './pages/CourseListPage';
import CourseFormPage from './pages/CourseFormPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<CourseListPage />} />
                    <Route path="/course/new" element={<CourseFormPage />} />
                    <Route path="/course/edit/:id" element={<CourseFormPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
