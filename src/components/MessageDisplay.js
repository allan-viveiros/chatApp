import { getDatabase, ref, onValue, push } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase.js";
import Message from "./Message.js"

const MessageDisplay = ({chatKey, sender}) => {
    // const [chatId, setChatId] = useState("");
    const [chats, setChats] = useState([]);
           
    console.log(chatKey);
    console.log(sender);
    // console.log(chatMessages);

    // if(chatKey === "") {
    //     console.log("LOADING 2...........");
    // }

    // useEffect(() => {
    //     if(chatKey === ""){
    //         console.log("there is no CHATKEY");
    //     }
    //     else {
    //         console.log("chatKey");
    //         console.log(chatKey);
    //     }        

    // }, [chatKey])

    useEffect(() => {        
        console.log(chatKey);
        
        // console.log("useEffect message Display");
        const db = getDatabase(app);
        const dbRef = ref(db, `/chats/${chatKey}`); 
        // const dbRef = ref(db, `/chats/${chatId}`); 
        
        console.log(dbRef);

        onValue(dbRef, (result) => {
            console.log(result.val());

            if(result.val()) {
                console.log("result.val() exists");
                
                const messagesObj = result.val();
                
                const arr = [];
                console.log(messagesObj);

                for(let msg in messagesObj) {
                    // console.log(msg);
                    // console.log(messagesObj[msg]);

                    const newMsgObj = {
                        from: messagesObj[msg].from,
                        message: messagesObj[msg].message,
                        time: messagesObj[msg].time
                    }
                    
                    arr.push(newMsgObj); 
                } 
                
                setChats(arr);
            }
            else {
                console.log("result.val() DON'T exists");

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
            
                const newChatInput = push(dbRef, inputChatObj);
                console.log(newChatInput);
            }
        });

                   
    }, [chatKey]);


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
