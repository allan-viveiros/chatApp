import { getDatabase, ref, onValue, get } from "firebase/database";
import { useEffect, useState } from "react";
import app from "../firebase.js";
import Message from "./Message.js"

const MessageDisplay = ({userRecip, userSend}) => {
    // const [chatId, setChatId] = useState("");
    // const [messages, setMessages] = useState([]);
   
    // useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db, `/users/${userRecip}`);

        let chatId = "";
        const arrayOfMessages = [];

        get(dbRef)
        .then((response) => {
            if(response.exists) {
                // console.log("response.val()");
                // console.log(response.val());
                const userChatObj = response.val();
                // const userChat = [];
                // console.log(response.val().chats)
                

                if(userChatObj.chats) {
                    let chatExists = false;
                    console.log("exist some chats");

                    for(let chatIndex in userChatObj.chats) {
                        // console.log(chatIndex);
                        // console.log(userChatObj.chats);
                        // console.log(userChatObj.chats[chatIndex].userId);

                        if(userChatObj.chats[chatIndex].userId === userSend) {
                            chatExists = true;
                            // console.log(userChatObj.chats[chatIndex].chatId);
                            // setChatId(userChatObj.chats[chatIndex].chatId);
                            chatId = userChatObj.chats[chatIndex].chatId;
                            console.log(`chatId inside: ${chatId}`);
                        }
                    }

                    // exist some chats, but there was no match.
                    if(chatExists === false) {
                        // create a new chat between the users
                        console.log(`Create a chat between ${userSend} and ${userRecip}`);
                    }



                }
                else {
                    console.log("there is no Chats Available!");
                    console.log(`Create a chat between ${userSend} and ${userRecip}`);
                }
                
            }
            else {
                console.log("No data Available!");
            }

            console.log(`chatID: ${chatId}`);

            const dbChat = getDatabase(app);
            const dbChatRef = ref(dbChat, `/chats/${chatId}`);
            onValue(dbChatRef, (chatResponse) => {
                const chatObj = chatResponse.val();
                console.log(chatObj);

                // const arrayOfMessages = [];

                for(let index in chatObj) {
                    // console.log(index);
                    // console.log(chatObj[index]);

                    const messageObj = {
                        message: chatObj[index].message,
                        time: chatObj[index].time,
                        from: chatObj[index].from
                    }

                    arrayOfMessages.push(messageObj);
                }

                // setMessages(arrayOfMessages);
            });

            console.log("arrayOfMessages1");
            console.log(arrayOfMessages);

        });


        console.log("arrayOfMessages2");
        console.log(arrayOfMessages);

    
    // }, );

    // useEffect(() => {
        // console.log("useEffect2");
        // console.log(`chatID: ${chatId}`);

        // const dbChat = getDatabase(app);
        // const dbChatRef = ref(dbChat, `/chats/${chatId}`);
        // onValue(dbChatRef, (chatResponse) => {
        //     const chatObj = chatResponse.val();
        //     console.log(chatObj);

        //     const arrayOfMessages = [];

        //     for(let index in chatObj) {
        //         // console.log(index);
        //         // console.log(chatObj[index]);

        //         const messageObj = {
        //             message: chatObj[index].message,
        //             time: chatObj[index].time,
        //             from: chatObj[index].from
        //         }

        //         arrayOfMessages.push(messageObj);
        //     }

        //     // setMessages(arrayOfMessages);
        // });


    // },[] );

    // console.log(chatId);
    // const db = getDatabase(app);
    // const dbRef = ref(db, `/chats/${chatId}`);
    // onValue();

    return(
        <section>
            <h2>Messages here</h2>
            
            <p>Messages from {userSend}</p>
            <p>To: {userRecip} </p>

            {/* {
                arrayOfMessages.map((message, index) => {
                    return (
                        <Message 
                            key={index}
                            from={message.from}
                            time={message.time}
                            message={message.message} 
                        />
                    )
                })
            } */}
            
        </section>
    )
}

export default MessageDisplay;
