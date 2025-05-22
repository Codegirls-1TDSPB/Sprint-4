'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const auth = localStorage.getItem('isAuthenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        router.replace('/login');
      }
      setIsLoading(false);
    }, [router]);

    if (isLoading) return <div className="p-4">Carregando...</div>;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
