import React from 'react';
/** 
import CourseListPage from './pages/CourseListPage';
import CourseFormPage from './pages/CourseFormPage';

function App() {
    return (
        <div>
        <center>
        <div>
            <CourseFormPage/>
        </div>
        <div>
            <CourseListPage/>
        </div>
        </center>
        <div>

        </div>
        </div>
        
       
    );
}

export default App;

*/

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import EditCourse from './components/EditCourse';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CourseList />} />
                <Route path="/new-course" element={<CourseForm />} />
                <Route path="/edit-course/:id" element={<EditCourse />} />
                
            </Routes>
        </Router>
    );
}

export default App;
