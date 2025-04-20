const mainNavigations = {
  HOME: 'Home',
  FEED: 'Feed',
  CALENDAR : 'Calendar',
  MY : 'My',
} as const;

const authNavigations = {
    AUTH_HOME : 'AuthHome',
    LOGIN : 'Login', 
    SIGNUP : 'Signup',
  } as const;
  
  const mapNavigations = {
    MAP_HOME: 'MapHome',
  } as const;
  
  
  export {mainNavigations, authNavigations, mapNavigations}