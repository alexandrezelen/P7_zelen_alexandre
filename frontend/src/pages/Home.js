/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let history = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) { history("/Login")} 
        else { axios.get("http://localhost:3001/posts", { headers: {accessToken: localStorage.getItem("accessToken")} }) }
        axios.get("http://localhost:3001/post").then((response) => { setListOfPosts(response.data) });
    }, []);

    return (
        <div>{listOfPosts.map((value, key) => {
            return (
                <div key={key}className="post" onClick={()=>{history(`/post/${value.id}`)}}>
                    <div className="title"> {value.title} </div>
                    <div className="text">{value.text}</div>
                    <div className="userId">{value.userId}</div>
                </div>
            );
        })}</div>
    );
}

export default Home;


// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";

// function Home() {
//   const [listOfPosts, setListOfPosts] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:3001/post").then((response) => {
//       setListOfPosts(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       {listOfPosts.map((value, key) => {
//         return (
//           <div className="post">
//             <div className="title"> {value.title} </div>
//             <div className="text">{value.text}</div>
//             <div className="userId">{value.userId}</div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Home;