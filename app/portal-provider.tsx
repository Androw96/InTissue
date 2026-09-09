'use client';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
export type Doctor = {
  user_id: string;
  email: string;
  full_name: string;
  stamp: string;
  institution: string;
  status: string;
  valid_until: number | null;
  review_note: string | null;
};
type Status = {
  signedIn: boolean;
  active: boolean;
  email?: string;
  doctor?: Doctor | null;
  approved?: boolean;
  admin?: boolean;
  expiresAt?: number;
};
type Portal = {
  status: Status;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  start: () => Promise<void>;
  logout: () => Promise<void>;
};
const Context = createContext<Portal | null>(null);
type RequestRow = {
  id: string;
  sku: string;
  quantity: number;
  fee: number;
  created_at: number;
};
type ApiResponses = {
  status: Status;
  session: { ok: boolean; expiresAt: number };
  activity: { expiresAt: number };
  logout: { ok: boolean };
  register: { ok: boolean; status: string };
  review: { ok: boolean };
  fee: { ok: boolean };
  request: { ok: boolean; id: string };
  fees: { fees: { sku: string; amount: number }[] };
  requests: { requests: RequestRow[] };
  admin: {
    doctors: Doctor[];
    fees: { sku: string; amount: number }[];
    requests: (RequestRow & {
      full_name: string;
      email: string;
      institution: string;
    })[];
  };
};
export async function portalApi<K extends keyof ApiResponses>(
  action: K,
  input?: unknown,
): Promise<ApiResponses[K]> {
  const response = await fetch('/api/portal/' + action, {
    method: input === undefined ? 'GET' : 'POST',
    headers:
      input === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: input === undefined ? undefined : JSON.stringify(input),
    cache: 'no-store',
  });
  const data = (await response.json()) as ApiResponses[K] & { error?: string };
  if (!response.ok) {
    if (response.status === 401)
      window.dispatchEvent(new Event('portal-expired'));
    throw new Error(data.error || 'A művelet nem sikerült.');
  }
  return data;
}
export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>({
    signedIn: false,
    active: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const deadline = useRef(0);
  const leaving = useRef(false);
  const refresh = useCallback(async () => {
    try {
      const next = await portalApi('status');
      setStatus(next);
      if (next.expiresAt) deadline.current = next.expiresAt;
      setError('');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    if (leaving.current) return;
    leaving.current = true;
    setStatus({ signedIn: false, active: false });
    const channel = new BroadcastChannel('intissue-logout');
    channel.postMessage('logout');
    channel.close();
    try {
      await portalApi('logout', {});
    } catch {}
    window.location.assign(
      '/signout-with-chatgpt?return_to=' +
        encodeURIComponent('/regisztracio?kilepett=1'),
    );
  }, []);
  const start = useCallback(async () => {
    setError('');
    try {
      const next = await portalApi('session', {});
      deadline.current = next.expiresAt;
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    }
  }, [refresh]);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  useEffect(() => {
    if (!status.active) return;
    const expire = () => {
      void logout();
    };
    let timer: ReturnType<typeof setTimeout> | undefined;
    let lastSent = 0;
    let lastEvent = deadline.current - 120000;
    let inflight = false;
    const send = async () => {
      if (inflight || leaving.current) return;
      inflight = true;
      lastSent = Date.now();
      try {
        const next = await portalApi('activity', {});
        deadline.current = next.expiresAt;
      } catch {
        expire();
      } finally {
        inflight = false;
      }
    };
    const activity = (event: Event) => {
      if (!event.isTrusted) return;
      const now = Date.now();
      if (now >= deadline.current || now - lastEvent >= 120000) {
        expire();
        return;
      }
      lastEvent = now;
      if (now - lastSent > 1000) void send();
      else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (lastEvent > lastSent) void send();
        }, 1000);
      }
    };
    const check = () => {
      if (Date.now() >= Math.min(deadline.current, lastEvent + 120000))
        expire();
    };
    const events = [
      'pointerdown',
      'pointermove',
      'keydown',
      'wheel',
      'touchstart',
    ];
    events.forEach((e) =>
      window.addEventListener(e, activity, { passive: true }),
    );
    const tick = setInterval(check, 250);
    window.addEventListener('portal-expired', expire);
    document.addEventListener('visibilitychange', check);
    window.addEventListener('pageshow', check);
    const channel = new BroadcastChannel('intissue-logout');
    channel.onmessage = expire;
    return () => {
      clearInterval(tick);
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, activity));
      window.removeEventListener('portal-expired', expire);
      document.removeEventListener('visibilitychange', check);
      window.removeEventListener('pageshow', check);
      channel.close();
    };
  }, [status.active, logout]);
  return (
    <Context.Provider
      value={{ status, loading, error, refresh, start, logout }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePortal() {
  const value = useContext(Context);
  if (!value) throw new Error('Missing portal');
  return value;
}
