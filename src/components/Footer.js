import { useState, useEffect } from "react";

const Footer = () => {
    const [currentYear, setCurrentYear] = useState();

    useEffect( () => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return(
        <footer>
            <div className="wrapper">
                <p>© {currentYear} by Allan Viveiros </p>
            </div>            
        </footer>
    )

}

export default Footer;
