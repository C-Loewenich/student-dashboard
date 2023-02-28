import './styles/Chart.css';
import {
    Chart as chartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import React, {useState, useEffect} from "react"
import { useOutletContext, useLocation } from "react-router-dom";
import Settings from "./Settings"


chartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
    Title,
    Tooltip,
    Legend,
)

function Chart(){
    
    const [chartData, setChartData] = useState({
        datasets: []
    })
    const [chartOptions, setChartOptions] = useState({})
    const [chartSettings, setChartSettings] = useState("bar")
    const data = useOutletContext()
    const location = useLocation()
    const pathname = location.pathname.replace("/","")
    
    function checkError() {
        if(data.students){return !data.students.includes(pathname) && pathname !== "dashboard"}
    }
    
    function settingsChanged(chartType) {
        setChartSettings(chartType)
    }

    useEffect(() => {
        let labelX = []
        let labelYFun = []
        let labelYDificulty = []
        let labelText = undefined
        let labelFunText = undefined
        let labelDificultyText = undefined

        if (pathname === "dashboard") {
            labelText = "Average of all students eveaulation of the assignment"
            labelFunText = "Average fun factor"
            labelDificultyText = "Average dificulty factor"
            data.averageData && data.averageData.forEach(element => {
                labelX.push(element.assignment)
                labelYFun.push(element.fun)
                labelYDificulty.push(element.dificulty)        
            });
        } else {
            labelText = `${pathname}'s eveaulation by assignment`
            labelFunText = "Fun factor"
            labelDificultyText = "Dificulty factor"
            data.studentData && data.studentData.filter((item) => {
                return item.name === pathname
            }).forEach(element => {
                labelX.push(element.assignment)
                labelYFun.push(element.fun)
                labelYDificulty.push(element.dificulty)        
            });
        }
    
        setChartData({
            labels: labelX,
            datasets: [
                {
                    type: chartSettings,
                    label: labelDificultyText,
                    data: labelYDificulty,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.4)",
                    fill: true
                },
                {
                    type: chartSettings,
                    label: labelFunText,
                    data: labelYFun,
                    borderColor: "rgb(212, 140, 140)",
                    backgroundColor: "rgba(212, 140, 140, 0.4)",
                    fill: true
                }
            ]
        })
        setChartOptions({
            responseive: true,
            CategoryPercentage: 0.2,
            plugins: {
                legend: {
                    position: "top"
                },
                title: {
                    display: true,
                    text: labelText
                }  
            },
            tension: 0.4,
            scales: {
                y:{
                    beginAtZero: true,
                    min: 0,
                    max: 5,
                },
            },
            elements: {
                line: {
                    borderWidth: 1
                }
            } 
        })
    }, [location, chartSettings, data.averageData, data.studentData, pathname])

    return(
        <div className="chart">
            {checkError() ? 
                <p className="error">
                    The student <span>{pathname}</span> was not found please Choose a student from the menu on the left
                </p> : 
                <div>
                    <Bar options={chartOptions} data={chartData} />
                    <Settings handleChange={settingsChanged} settings={chartSettings}/>
                </div>
            }
            
        </div>
    )
}

export default Chart