import React, { useEffect } from "react";

const ExitApp = () => {
    useEffect(() => {
        const handleF5 = (event) => {
            if(event.keyCode === 116) {
                if (!window.confirm("Are you sure you want to reset the app?")) {
                    event.preventDefault();
                }
            }
        };

        window.addEventListener("keydown", handleF5);

        return () => {
            window.removeEventListener("keydown", handleF5);
        }

    }, []);

    const handleExitButton = () => {
        if (window.confirm("Are you sure you want to reset the app?")) {
            window.location.reload();
        }
    }

    return (
        <div className="exitApp">
            <span onClick={handleExitButton}>Exit Chat</span>
        </div>
    );
}

export default ExitApp;