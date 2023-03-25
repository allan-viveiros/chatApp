
const Message = ({from, time, message, userSender}) => {
    // console.log(message, userSender.userId);
    let classSwitch = "";
    let imgSwitch = "";

    if(userSender.userId === from) {
        classSwitch = "sender";
        imgSwitch = "https://placekitten.com/50/50";
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
