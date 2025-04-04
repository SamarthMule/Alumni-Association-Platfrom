import { Grid } from "@chakra-ui/react";
import Footer from "../common/Footer";
import EventNavbar from "./EventNavbar";
import { Outlet } from "react-router";

const EventLayout = () =>{
    return (
        <Grid templateRows={"auto 1fr auto"} minH="100vh" bg="gray.50">
            <EventNavbar />
            <Outlet />
            <Footer />
        </Grid> 
    )
}

export default EventLayout;