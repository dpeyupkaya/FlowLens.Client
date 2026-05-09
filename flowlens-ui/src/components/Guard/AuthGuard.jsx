import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userService } from '../../services/userService'; 

const AuthGuard = ({ children, setUser }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const userData = await userService.getUserMe();
        
        setIsAuthorized(true);
        setUser(userData); 
        
      } catch (error) {
        setIsAuthorized(false);
        setUser(null);
      } finally {
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [setUser]); 

  if (isVerifying) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#020617] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-30 z-0"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.6)]"></div>
          <span className="font-mono text-[11px] text-teal-500 tracking-[0.25em] uppercase">
            GÜVENLİK PROTOKOLÜ DOĞRULANIYOR
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/401" replace />;
  }

  return children;
};

export default AuthGuard;