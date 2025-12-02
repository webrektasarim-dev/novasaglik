"use client";

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function MaintenanceCheck({ children }: { children: React.ReactNode }) {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Skip check for admin routes, maintenance page, and API routes
    if (
      pathname?.startsWith('/admin') ||
      pathname === '/maintenance' ||
      pathname?.startsWith('/api')
    ) {
      return;
    }

    // Check maintenance mode in background - don't block rendering
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
          }
        }
      } catch (error) {
        console.error('Maintenance check error:', error);
        // Hata durumunda site açık kalır
      }
    };

    checkMaintenance();
  }, [pathname, router]);

  // If maintenance mode is active, don't render children
  if (isMaintenance) {
    return null;
  }

  // İçeriği hemen göster - maintenance check arka planda çalışır
  return <>{children}</>;
}

