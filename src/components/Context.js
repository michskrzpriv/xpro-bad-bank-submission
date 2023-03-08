import React from 'react';
import {initjson} from "../initdata";

export const UserContext = React.createContext(null);

//loads all user data from local storage and performs a fallback to defaults if none
export function loadAllUserData() {
  return JSON.parse( localStorage.getItem('users') || initjson );
}

export function saveAllUserData( data ) {
  localStorage.setItem('users', JSON.stringify(data) );
} 

//
// Change this method to retrieve a logged in user that will be put into context.
// 
export function getLoggedIn() {
  const allUsers = loadAllUserData();
  const loggedInUserId = localStorage.getItem('loggedInUserId');

  //if anyone logged in, find him, if not set the first one in line as logged in
  const user = loggedInUserId ? allUsers.find( u => u.id === loggedInUserId ) : allUsers[0];
  if( !loggedInUserId ) logIn( user );

  return user;
}

export function logIn( user ) {
  localStorage.setItem('loggedInUserId', user.id)
}


export function initUserDataOnCreate( user ) {
  user.balance = 400 + Math.round( Math.random()*100 );
}
