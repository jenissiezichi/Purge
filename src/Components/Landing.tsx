import {Navbar} from "@/Components/Navbar.tsx";
import {Hero} from "@/Components/Hero";
import {Features} from "@/Components/Feature.tsx";
import {HowItWorks} from "@/Components/HowItWorks.tsx";
import {OpenSource} from "@/Components/OpenSource.tsx";
import {Footer} from "@/Components/Footer.tsx";
export function Landing() {


    return (
<div>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <OpenSource/>
    <Footer/>
</div>


    )
}