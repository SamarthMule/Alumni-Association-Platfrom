import Footer from "../common/Footer";
import EventNavbar from "./EventNavbar";
import { Outlet } from "react-router";

const EventLayout = () =>{
    return (
        <>
            <EventNavbar />
            <Outlet />
            <Footer />
        </> 
    )
}

export default EventLayout;