import "./styles/App.scss";
import UserContainer from "./components/UserContainer.js";
import Footer from "./components/Footer.js";

function App() {

  // Handle the page refresh F5 key
  // const handleRefresh = (event) => {
  //   if(event.keyCode === 116) {
  //       event.preventDefault();
  //       alert("Do you really want to restart the app?");
  //   }
  // }

  // // Creating an event listener
  // document.addEventListener("keydown", handleRefresh);

  return (
    <div className="App">

      <UserContainer />
      <Footer />
      
    </div>
  );
}

export default App;
