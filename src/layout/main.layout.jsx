import Navigation from "@/components/shared/Navigation"
import { Outlet } from "react-router-dom"

function MainLayout () {
    return (
        <div>
            <Navigation/>
            <div  className="container">
                <Outlet/>
            </div>    
        </div>
    )
}

export default MainLayout