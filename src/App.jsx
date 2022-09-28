import React, { Component } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Addproduct from './pages/Addproduct.jsx'
import Categorylist from './pages/Categorylist.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Kot from './pages/Kot.jsx'
import Login from './pages/Login.jsx'
import Orders from './pages/Orders.jsx'
import Pagenotfound from './pages/Pagenotfound.jsx'
import Pos from './pages/Pos.jsx'
import Productlist from './pages/Productlist.jsx'
import Orderlist from './pages/Orderlist.jsx'

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/' element={<Dashboard />} />
        <Route exact path='/pos' element={<Pos />} />
        <Route exact path='/orderdetails' element={<Orders />} />
        <Route exact path='/kot' element={<Kot />} />
        <Route exact path='/productlist' element={<Productlist />} />
        <Route exact path='/categorylist' element={<Categorylist />} />
        <Route exact path='/addproduct' element={<Addproduct />} />
        <Route exact path='/orderlist' element={<Orderlist />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    )
  }
}

export default App
