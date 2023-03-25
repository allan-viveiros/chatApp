import { getDatabase, ref, onValue, push } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase.js";
import Message from "./Message.js"

const MessageDisplay = ({chatKey, sender}) => {
    // const [chatId, setChatId] = useState(chatKey);
    const [chats, setChats] = useState([]);
       
    console.log(chatKey);
    console.log(sender);
    // console.log(chats);

    if(chatKey === "") {
        console.log("LOADING 2...........");
    }

    useEffect(() => {        
        console.log(chatKey);
        
        // console.log("useEffect message Display");
        const db = getDatabase(app);
        // const dbRef = ref(db, `/chats/${chatKey}`); 
        const dbRef = ref(db, `/chats${chatKey}`); 
        
        console.log(dbRef);

        onValue(dbRef, (result) => {
            console.log(result.val());

            if(result.val()){
                console.log("result.val() exists");
                
                const messagesObj = result.val();
                
                const arr = [];
                console.log(messagesObj);

                for(let msg in messagesObj) {
                    console.log(msg);
                    console.log(messagesObj[msg]);

                    // if(msg === chatId) {
                        // console.log(messagesObj);
                        const arr2 = messagesObj[msg];
                    
                        for(let i in arr2) {
                            // console.log(arr2[i]);
                            
                            const newMsgObj = {
                                from: arr2[i].from,
                                message: arr2[i].message,
                                time: arr2[i].time
                            }
                            
                            arr.push(newMsgObj);
                        }
                        
                        setChats(arr);
                    // }
                    // else {
                    //     console.log(chatId);
                    // }  
                }                
            }
            else {
                console.log("result.val() DON'T exists");
                
                const db = getDatabase(app);
                const dbRef = ref(db, `/chats/${chatKey}`);             

                const inputChatObj = {
                    from: "Message",
                    message: "Welcome to the chat!",
                    time: "now"
                }
            
                const newChatInput = push(dbRef, inputChatObj);
                console.log(newChatInput);
            }
        });
                
    }, []);

    // console.log(chats);

    return(
        <section className="messagesDisplay">
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
                            userSender={sender}
                        />
                    )
                })
            }
            
        </section>
    )
}

export default MessageDisplay;
