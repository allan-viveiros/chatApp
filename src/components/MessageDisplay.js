import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase.js";
import Message from "./Message.js"

const MessageDisplay = ({chatKey}) => {
    const [chatId, setChatId] = useState("");
    const [chats, setChats] = useState([]);
   
    console.log(chatKey);
    console.log(chats);

    useEffect(() => {
        console.log("useEffect message Display");
        const db = getDatabase(app);
        const dbRef = ref(db, `/chats/${chatKey}`); 
        

        onValue(dbRef, (result) => {
            console.log(result.val());

            const messagesObj = result.val();
            const arr = [];

            for(let msg in messagesObj) {
                // console.log(msg);
                console.log(messagesObj[msg]);
                // console.log(messagesObj);
                const arr2 = messagesObj[msg];

                for(let i in arr2) {
                    console.log(arr2[i]);

                    const newMsgObj = {
                        from: arr2[i].from,
                        message: arr2[i].message,
                        time: arr2[i].time
                    }

                    arr.push(newMsgObj);
                }

                setChats(arr);
                
                
                // const newMsgObj = {
                //     from: messagesObj[msg].from,
                //     message: messagesObj[msg].message,
                //     time: messagesObj[msg].time
                // }

                // arrayOfMessages.push(newMsgObj);
            }

            // console.log(arrayOfMessages);
            // setChats(arrayOfMessages);

        });
        
    }, []);


    console.log(chats);


    return(
        <section>
            <h2>Messages here</h2>
            
            {/* <p>Messages from {userSend}</p>
            <p>To: {userRecip} </p> */}

            {
                chats.map((message, index) => {
                    return (
                        <Message 
                            key={index}
                            from={message.from}
                            time={message.time}
                            message={message.message} 
                        />
                    )
                })
            }
            
        </section>
    )
}

export default MessageDisplay;
