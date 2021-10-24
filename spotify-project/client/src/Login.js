import React from 'react'
import { Container  } from 'react-bootstrap'

require('dotenv').config()

/**

 */
const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-library-modify',
    'user-read-playback-state',
    'user-modify-playback-state'
]

/**

 */
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const SCOPE = () => {
    var string = '';
    scopes.forEach(element => string += element +'%20');
    return string;
}


/**

 */

const AUTH_URL = 'https://accounts.spotify.com/authorize' +
'?client_id=' + CLIENT_ID + 
'&response_type=code' +
'&redirect_uri=' + REDIRECT_URI +
'&scope=' + SCOPE();


export default function Login() {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login With Spotify
        </a>
      </Container>
    )
  }
