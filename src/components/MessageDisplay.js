import { getDatabase, ref, onValue, push } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import app from "../firebase.js";
import Message from "./Message.js"

const MessageDisplay = ({chatKey, sender}) => {
    const [chats, setChats] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {        
        const db = getDatabase(app);
        const dbRef = ref(db, `/chats/${chatKey}`); 

        // Request to Firebase to bring the chats stored and keep tracking for new ones
        onValue(dbRef, (result) => {
            if(result.val()) {                
                const messagesObj = result.val();                
                const arrMsg = [];

                //Store the old messages on an array of messages
                for(let msg in messagesObj) {
                    const newMsgObj = {
                        from: messagesObj[msg].from,
                        message: messagesObj[msg].message,
                        time: messagesObj[msg].time
                    }
                    
                    arrMsg.push(newMsgObj); 
                } 
                
                setChats(arrMsg);
            }
            else {
                // In case of new chat between the user sender and user recipient, create an Welcome message
                const current = new Date().toString();        
                const day = current.slice(8, 10);
                const month = current.slice(4, 7);        
                const hour = current.slice(16, 21);

                const arr = [];
                
                const db = getDatabase(app);
                const dbRef = ref(db, `/chats/${chatKey}`);             

                const inputChatObj = {
                    from: "Message",
                    message: "Welcome to the chat!",
                    time: `${month} ${day}, ${hour}`
                }

                arr.push(inputChatObj);

                setChats(arr);
            
                push(dbRef, inputChatObj);                
            }
        });                   
    }, [chatKey]);

    // Tracking the new messages to automatic scroll down
    useEffect(() => {        
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [chats]);

    return(
        <section className="messagesDisplay">
            {                
                chats.map((message, index) => {
                    return (
                        <Message 
                            key={index}
                            from={message.from}
                            time={message.time}
                            message={message.message} 
                            userSender={sender}
                        />
                    )
                })
            }

            <div ref={bottomRef}></div>            
        </section>
    )
}

export default MessageDisplay;
