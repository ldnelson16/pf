//imports
import styles from '../../styles/planner/homepage.module.css';
import textstyles from '../../styles/planner/texts.module.css';
import {useState} from 'react';
//import updata from '../../styles/planner/homepage.module.css';

//export default 
export default function HomePage(){
  //Event listeners
  const signup = () => {
    console.log("Attempting to signup");
    console.log(username.toLowerCase()+" "+password);
    //Checking for username
    if(updata["usernames"].includes(username.toLowerCase())){
      console.log("Username "+username+" already exists.");
      fs.writeFileSync('../data/upkeys.json',JSON.stringify(updata));
      //display error message for user to sign in

    }
    else{
      updata["usernames"]+=[username.toLowerCase()];
    }
  }
  const login = () => {
    console.log("Looking for username/password pair");
    //Check database for u/p pair
    console.log(username.toLowerCase()+"/"+password);
    if(updata["key_pairs"].includes(username.toLowerCase()+"/"+password)){
      console.log("Key pair found");
      //Enter next page

    }
    else{
      console.log("Key pair not found, try again.");
      //prompt error message
    }
    console.log("Button clicked");
  }
  const enterusername = (event) => {
    console.log("Username changed");
    setUsername(event.target.value);
  }
  const enterpassword = (event) => {
    console.log("Password changed");
    setPassword(event.target.value);
    console.log(password);
  }
  const enterfname = (event) => {
    console.log("First name changed");
    setFname(event.target.value);
    console.log(fname);
  }
  const enterlname = (event) => {
    console.log("Last name changed");
    SetLname(event.target.value);
    console.log(lname);
  }
  const handleSUHover = () => {
    setSUHoverState(true);
    console.log("Mouse Entered Sign Up Box");
  }
  const handleSULeave = () => {
    setSUHoverState(false);
    console.log("Mouse Left Sign Up Box");
  }
  //useStates
  const [signuphover,setSUHoverState] = useState(false);
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [fname,setFname] = useState("");
  const [lname,SetLname] = useState("");
  //variable CSS states
  const logindiv = {
    display: signuphover?"flex":"none"
  };
  const signindiv = {
    display: signuphover?"none":"flex"
  }

  return(
    <>
      <div className={styles.body}>
        <div onMouseLeave={handleSULeave} className={styles.centerbox}>
          <div className={styles.loginside}>
            <div className={styles.login}>
              <div className={styles.loginheading}>
                <span className={textstyles.heading}>Log In</span>
              </div>
              <input onChange={enterusername} name="username" type="text" className={styles.input} placeholder='username'></input>
              <input onChange={enterpassword} name="password" type="password" className={styles.input} placeholder='password'></input>
              <button type="submit" className={styles.signinbutton} onClick={login}>Log In</button>
            </div>
          </div>
          <div onMouseEnter={handleSULeave} style={logindiv} className={styles.loginsidecover}><span className={textstyles.h1}>Log In</span></div>
          <div className={styles.signinside}>
            <div className={styles.login}>
              <div className={styles.loginheading}>
                <span className={textstyles.heading}>Sign Up</span>
              </div>
              <div className={styles.namediv}>
                <input onChange={enterfname} name="fname" type="text" className={styles.input3} placeholder="first name"></input>
                <input onChange={enterlname} name="lname" type="text" className={styles.input3} placeholder="last name"></input>
              </div>
              <input onChange={enterusername} name="username" type="text" className={styles.input2} placeholder='username'></input>
              <input onChange={enterpassword} name="password" type="password" className={styles.input2} placeholder='password'></input>
              <button type="submit" onClick={signup} className={styles.yellowsigninbutton}>Sign Up</button>
            </div>
          </div>
          <div onMouseEnter={handleSUHover} style={signindiv} className={styles.signinsidecover}><span className={textstyles.h1}>Sign Up</span></div>
        </div>
      </div>
    </>
  );
}