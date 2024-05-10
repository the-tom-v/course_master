import React from 'react';

import CourseListPage from './pages/CourseListPage';
import CourseFormPage from './pages/CourseFormPage';

function App() {
    return (
        <div>
        <div>
            <CourseListPage/>
        </div>
        <div>
            <CourseFormPage/>
        </div>
        </div>
       
    );
}

export default App;
