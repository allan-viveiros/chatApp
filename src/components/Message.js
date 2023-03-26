
const Message = ({from, time, message, userSender}) => {
    // console.log(message, userSender.userId);
    let classSwitch = "";
    let imgSwitch = "";

    console.log(userSender.userId);

    if(from === userSender.userId) {
        classSwitch = "sender";
        imgSwitch = "https://placekitten.com/50/50";
    }
    else if(from === "Message") {
        classSwitch="messageApp";
        imgSwitch = "https://placekitten.com/40/40";
    }
    else {
        classSwitch = "recipient";
        imgSwitch = "https://placebear.com/50/50";
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
