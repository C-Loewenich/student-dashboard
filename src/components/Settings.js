import './styles/Settings.css';

function Settings({handleChange, settings}){
    return(
        <div className="settings-container">
            <div className="settings">
                <form>
                    <label>
                        <input
                            type="radio"
                            name="chartType"
                            value="bar"
                            checked = {settings === "bar"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        Bar chart
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="chartType"
                            value="line"
                            checked = {settings === "line"}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        Line chart
                    </label>
                </form>
            </div>
        </div>
    )
}
export default Settings