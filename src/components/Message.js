
const Message = ({from, time, message}) => {
    console.log(message);
    return(
        <>
            <p>from: {from}</p>
            <p>time: {time}</p>
            <p>message: {message}</p>
        </>
    )
}

export default Message;
