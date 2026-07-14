import {createContext,useContext,useState,useEffect} from 'react';

const AuthContext=createContext(null);

const DEFAULT_USER={
  email:'',
  name:'',
  verified:false,
  kycStatus:'none', // none | pending | verified | rejected
  hasBank:false,
  tier:0,
};

export function AuthProvider({children}){
  const [user,setUser]=useState(null); // null = not logged in
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    // Check local storage for saved session
    try{
      const saved=localStorage.getItem('sivan_user');
      if(saved) setUser(JSON.parse(saved));
    }catch(e){}
    setLoading(false);
  },[]);

  const signin=(email)=>{
    // In a real app this calls your backend; we simulate a signed-in user.
    const existing=(()=>{try{return JSON.parse(localStorage.getItem('sivan_user')||'null')}catch(e){return null}})();
    const newUser=existing && existing.email===email ? existing : {
      ...DEFAULT_USER,
      email,
      name:email.split('@')[0].replace(/[._-]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),
      createdAt:Date.now(),
    };
    localStorage.setItem('sivan_user',JSON.stringify(newUser));
    setUser(newUser);
  };

  const signup=(email,password,fullName)=>{
    const newUser={
      ...DEFAULT_USER,
      email,
      name:fullName||email.split('@')[0].replace(/[._-]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),
      createdAt:Date.now(),
    };
    localStorage.setItem('sivan_user',JSON.stringify(newUser));
    setUser(newUser);
  };

  const signout=()=>{
    localStorage.removeItem('sivan_user');
    setUser(null);
  };

  const updateUser=(patch)=>{
    setUser(prev=>{
      const next={...prev,...patch};
      localStorage.setItem('sivan_user',JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{user,loading,signin,signup,signout,updateUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){return useContext(AuthContext);}
