import {redirect} from "react-router-dom"

function NotFound() {
    redirect("/dashboard")
}

export default NotFound