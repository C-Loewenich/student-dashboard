import './styles/Container.css';
import React, {useState, useEffect} from "react"
import {NavLink, Route, Routes} from "react-router-dom"
import Home from "./Home"
import Dashboard from "./Dashboard"
import StudentChart from './StudentChart'
import NotFound from "./NotFound"
import {StudentNav} from './StudentNav';
import csvData from "../Student-mock-data.csv"

function Container(){
    const [data , setData] = useState({})

    useEffect(function() {
        fetch(csvData)
        .then((response) => response.text())
        .then((Data) => { 
            let dataSet = []
            let studentArr = []
            let assignmentArr = []
            Data.split(/\n/).slice(1).forEach(el => {
                const studentData = el.split(",")
                if(!studentArr.includes(studentData[0])) {studentArr.push(studentData[0])}
                if(!assignmentArr.includes(studentData[1])) {assignmentArr.push(studentData[1])}                
                const newStudent = 
                    {
                        name: studentData[0],
                        assignment: studentData[1],
                        dificulty: Number(studentData[2]),
                        fun: Number(studentData[3])
                    }
                dataSet.push(newStudent)
            })
            setData({
                studentData: dataSet,
                averageData: setAveragesByAssignment(dataSet, assignmentArr),
                students: studentArr,
            })
        })
    }, [])

    function setAveragesByAssignment(studentData, assignmentArr) {
        let averageByAssignment = [] 
        assignmentArr.forEach(item => {
            let dificultyArr = []
            let funArr = []
            studentData.forEach((data) => {
                if(data.assignment === item) {
                    dificultyArr.push(data.dificulty)
                    funArr.push(data.fun)
                }
            })
            const averageDificulty = dificultyArr.reduce((currentTotal, item) => currentTotal + item)/dificultyArr.length
            const averageFun = funArr.reduce((currentTotal, item) => currentTotal + item)/funArr.length
            averageByAssignment.push({assignment: item, dificulty: averageDificulty, fun: averageFun})
        });
        return averageByAssignment
    }

    return (
        <div className="container">
        <header className="App-header">
            <h1>Student dashboard</h1>
            <nav>
                <ul>
                    <li><NavLink to="/Home">Home</NavLink></li>
                    <li><NavLink to="/dashboard" index state={data}>Dashboard</NavLink></li>
                </ul>
            </nav>
        </header>
        <main>
            <Routes>
            <Route path="/" element={<Home />} />    
            <Route path="/Home" element={<Home />} />
            <Route element={<StudentNav data={data}/>}>  
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path=":student" element={<StudentChart />} />
            </Route>
            <Route path="*" element={<NotFound />}/>
            </Routes>
        </main>
        </div>
    );
}

export default Container;
