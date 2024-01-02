// import React from "react";
// class UserClass extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         userinfo: {
//             name : 'deeya',
//             location : 'banswara',
//             avatar_url : ''
//         }
//       }
//     }
//     async componentDidMount(){
//        const response = await fetch("https://api.github.com/users/2020deeya");
//        console.log('response',response);
//        const jsonResponse = await response.json();
//        this.setState({
//         userinfo : jsonResponse
//        })
//        console.log('jsonResponse',jsonResponse);
//     }
//     render() {
//         console.log('in Render');
//         const {name, location, avatar_url} = this.state.userinfo;
//         return (
//             <>
//             <img src={avatar_url}/>
//             <h1>Hello {name}</h1>
//             <h3>From {location}</h3>
//             </>
//         )
//     }
// }

// export default UserClass;

const User = ({name}) => {
  return (
    <div className='m-4 p-4 bg-gray-50 rounded-lg'>
      <h2>{name}</h2>
    </div>
  )
}

export default User;

