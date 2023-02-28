import './styles/Home.css';
function Home() {
    return(
        <div className="home">
            <div className='home-container'>
                <p>Dear Reader,</p>
                <p>I have over the last many months followed the frontend development course at the Winc Academy, what you see here is the final project of this course.</p>
                <p>The assignment here was to build a student dashboard to present the mockup data from a CSV file and chart this data, showing the student's assessments of each course in regards to how difficult and how fun the specific course was.</p>
                <p>For myself, I can say that this course has been both fun and at times difficult too.</p>
                <div className="quote-container">
                    <p className="quote">it has definately been an interesting learning experience</p>
                </div>
                <p>Please feel free to take a look at my dashbord and the code behind it.</p>
                <p className="yours-sincerely">Yours sincerely.</p>
                <p className="name">Casper Loewenich</p>
            </div>
        </div>
    )
}

export default Home