import {BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {AuthProvider,useAuth} from './context/AuthContext';
import Landing from './pages/Landing';
import {Login,Signup} from './pages/Auth';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import {Transactions,PaymentMethods,Verification,Settings,Support} from './pages/AppPages';
import './App.css';

function RequireAuth({children}){
  const {user,loading}=useAuth();
  const loc=useLocation();
  if(loading) return <div className="loading-screen">Loading…</div>;
  if(!user) return <Navigate to="/login" replace state={{from:loc.pathname}}/>;
  return children;
}

function RedirectIfAuthed({children}){
  const {user}=useAuth();
  if(user) return <Navigate to="/app" replace/>;
  return children;
}

function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<RedirectIfAuthed><Login/></RedirectIfAuthed>}/>
      <Route path="/signup" element={<RedirectIfAuthed><Signup/></RedirectIfAuthed>}/>
      <Route path="/app" element={<RequireAuth><AppLayout/></RequireAuth>}>
        <Route index element={<Dashboard/>}/>
        <Route path="sell" element={<Trade mode="sell"/>}/>
        <Route path="buy" element={<Trade mode="buy"/>}/>
        <Route path="transactions" element={<Transactions/>}/>
        <Route path="payment-methods" element={<PaymentMethods/>}/>
        <Route path="verification" element={<Verification/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="support" element={<Support/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AuthProvider>
  );
}
