import React from 'react'
import './home.css'
import FirstScreen from "../../content/firstScreen/firstScreen";
import HowItDo from "../../content/HowItDo/HowItDo";
import WhyAccount from "../../content/whyAccount/WhyAccount";
import Footer from "../../components/footer/footer";

function Home() {
    return(
        <>
            <FirstScreen />
            <HowItDo />
            <WhyAccount />
            <Footer />
        </>
    )
}

export default Home;


































