
const Message = ({from, time, message, userSender}) => {
    let classSwitch = "";
    let imgSwitch = "";

    // Generate random robots image to the users
    if(from === userSender.userId) {
        classSwitch = "sender";
        imgSwitch = `https://robohash.org/${from}.png`;
    }
    else if(from === "Message") {
        classSwitch="messageApp";
        imgSwitch = `https://robohash.org/${from}.png`;
    }
    else {
        classSwitch = "recipient";
        imgSwitch = `https://robohash.org/${from}.png`;
    }
 
    return(
        <div className={classSwitch}>
            <p className="chatMsg">{message}</p>
            <div className="avatar">
                <div className="imgContainer">
                    <img src={imgSwitch} alt="Avatar"></img>
                </div>
                <p className="time">{time}</p>
            </div>            
        </div>
    )
}

export default Message;
