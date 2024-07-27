import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateProject from './pages/CreateProjects';
import ShowProject from './pages/ShowProject';
import DeleteProject from './pages/DeleteProject';
import EditProject from './pages/EditProject';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/projects/create' element={<CreateProject />} />
      <Route path='/projects/details/:id' element={<ShowProject />} />
      <Route path='/projects/edit/:id' element={<EditProject />} />
      <Route path='/projects/delete/:id' element={<DeleteProject />} />
    </Routes>
  )
}

export default App;