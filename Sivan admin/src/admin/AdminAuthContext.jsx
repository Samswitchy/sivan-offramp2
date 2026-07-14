import {createContext,useContext,useState,useEffect} from 'react';

const AdminAuthContext=createContext(null);

// Demo admin accounts (in production, validate against backend)
const ADMINS=[
  {email:'admin@sivantech.online',password:'admin123',name:'Sivan Admin',role:'Super Admin',avatar:'SA'},
  {email:'ops@sivantech.online',password:'ops123',name:'Operations',role:'Operator',avatar:'OP'},
  {email:'compliance@sivantech.online',password:'comp123',name:'Compliance',role:'Compliance',avatar:'CO'},
];

const DEFAULT_ADMIN={
  email:'',name:'',role:'',avatar:'',
  lastLogin:null,
  permissions:['all'],
};

export function AdminAuthProvider({children}){
  const [admin,setAdmin]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    try{
      const saved=localStorage.getItem('sivan_admin');
      if(saved) setAdmin(JSON.parse(saved));
    }catch(e){}
    setLoading(false);
  },[]);

  const signin=(email,password)=>{
    const found=ADMINS.find(a=>a.email.toLowerCase()===email.toLowerCase() && a.password===password);
    if(!found) throw new Error('Invalid email or password');
    const session={
      ...DEFAULT_ADMIN,
      email:found.email,name:found.name,role:found.role,avatar:found.avatar,
      lastLogin:Date.now(),
      permissions: found.role==='Super Admin'
        ?['all']
        : found.role==='Compliance'
          ?['users','kyc','transactions','disputes','audit']
          :['transactions','users','support','fees'],
    };
    localStorage.setItem('sivan_admin',JSON.stringify(session));
    setAdmin(session);
    return session;
  };

  const signout=()=>{
    localStorage.removeItem('sivan_admin');
    setAdmin(null);
  };

  const has=(perm)=> admin && (admin.permissions.includes('all') || admin.permissions.includes(perm));

  return (
    <AdminAuthContext.Provider value={{admin,loading,signin,signout,has}}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(){return useContext(AdminAuthContext);}
