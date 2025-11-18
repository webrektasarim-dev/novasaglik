"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function MaintenanceCheck({ children }: { children: React.ReactNode }) {
  const [isMaintenance, setIsMaintenance] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Skip check for admin routes, maintenance page, and API routes
    if (
      pathname?.startsWith('/admin') ||
      pathname === '/maintenance' ||
      pathname?.startsWith('/api')
    ) {
      setIsMaintenance(false);
      return;
    }

    // Check maintenance mode
    const checkMaintenance = async () => {
      try {
        const res = await fetch('/api/check-maintenance', {
          cache: 'no-store',
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.maintenanceMode) {
            setIsMaintenance(true);
            router.push('/maintenance');
          } else {
            setIsMaintenance(false);
          }
        } else {
          setIsMaintenance(false);
        }
      } catch (error) {
        console.error('Maintenance check error:', error);
        setIsMaintenance(false);
      }
    };

    checkMaintenance();
  }, [pathname, router]);

  // Show nothing while checking (prevents flash)
  if (isMaintenance === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#14b8a6] mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // If maintenance mode is active, don't render children
  if (isMaintenance) {
    return null;
  }

  return <>{children}</>;
}

