import {BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {AuthProvider,useAuth} from './context/AuthContext';
import {AdminAuthProvider,useAdminAuth} from './admin/AdminAuthContext';
import Landing from './pages/Landing';
import {Login,Signup} from './pages/Auth';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import {Transactions,PaymentMethods,Verification,Settings,Support} from './pages/AppPages';

// Admin imports
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminOverview from './admin/pages/Overview';
import {Users,Transactions as AdminTx,KYC,Assets,Rails,Disputes,Audit,Fees,AdminSettings} from './admin/pages/AdminPages';
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

function RequireAdmin({children}){
  const {admin,loading}=useAdminAuth();
  const loc=useLocation();
  if(loading) return <div className="loading-screen">Loading…</div>;
  if(!admin) return <Navigate to="/admin/login" replace state={{from:loc.pathname}}/>;
  return children;
}

function RedirectIfAdmin({children}){
  const {admin}=useAdminAuth();
  if(admin) return <Navigate to="/admin" replace/>;
  return children;
}

function AppRoutes(){
  return (
    <Routes>
      {/* Public marketing + customer auth */}
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<RedirectIfAuthed><Login/></RedirectIfAuthed>}/>
      <Route path="/signup" element={<RedirectIfAuthed><Signup/></RedirectIfAuthed>}/>

      {/* Customer app */}
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

      {/* Admin console */}
      <Route path="/admin/login" element={<RedirectIfAdmin><AdminLogin/></RedirectIfAdmin>}/>
      <Route path="/admin" element={<RequireAdmin><AdminLayout/></RequireAdmin>}>
        <Route index element={<AdminOverview/>}/>
        <Route path="users" element={<Users/>}/>
        <Route path="transactions" element={<AdminTx/>}/>
        <Route path="kyc" element={<KYC/>}/>
        <Route path="assets" element={<Assets/>}/>
        <Route path="rails" element={<Rails/>}/>
        <Route path="disputes" element={<Disputes/>}/>
        <Route path="audit" element={<Audit/>}/>
        <Route path="fees" element={<Fees/>}/>
        <Route path="settings" element={<AdminSettings/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </AdminAuthProvider>
    </AuthProvider>
  );
}
