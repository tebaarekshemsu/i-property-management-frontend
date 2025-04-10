'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { jwtDecode } from 'jwt-decode';

type Props = { children: React.ReactNode; };

type DecodedToken = { role: 'user' | 'admin' | 'superadmin'; exp?: number; iat?: number; [key: string]: any; };

export default function ClientAdminGuard({ children }: Props) { const [isAuthorized, setIsAuthorized] = useState(false); const router = useRouter();

useEffect(() => { const token = localStorage.getItem('token');
if (!token) {
  router.replace('/auth');
  return;
}

try {
  const decoded = jwtDecode<DecodedToken>(token);

  switch (decoded.role) {
    case 'admin':
      setIsAuthorized(true);
      break;
    case 'user':
      router.replace('/user');
      break;
    case 'superadmin':
      router.replace('/superadmin');
      break;
    default:
      router.replace('/auth');
  }
} catch (err) {
  router.replace('/auth');
}
}, [router]);

if (!isAuthorized) return null;

return <>{children}</>; }