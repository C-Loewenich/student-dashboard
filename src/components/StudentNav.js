
import './styles/StudentNav.css';
import {NavLink, Outlet} from "react-router-dom"

export function StudentNav({data}) {
    
    function addKeyToStudents(array){
        const arrayLength = array.length
        let outputArray = []
        for(let i=0; i<arrayLength; i++) {
            outputArray.push({id: i, name: array[i]})
        }
        return outputArray 
    }

    return(
        <div className="dashboard">
            <div className="student-nav">
                <h3 className="">All sutdents</h3>
                    <NavLink to="/dashboard" state={data}>Average</NavLink>
                <h3 className="">Student's chart</h3>
                {data.students && addKeyToStudents(data.students).map((student)=>(
                    <NavLink to={student.name} key={student.id} >{student.name}</NavLink>
                ))}
            </div>
            <div className="student-chart">
               <Outlet context={data}/> 
            </div>
             
        </div>
    )
    
}