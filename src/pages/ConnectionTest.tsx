import { useState, useEffect } from "react";
import { Activity, Database, Lock, Radio, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase, testConnection, testAuth } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

type TestStatus = 'idle' | 'loading' | 'success' | 'error';

interface TestResult {
  status: TestStatus;
  message?: string;
  details?: any;
}

const ConnectionTest = () => {
  const { user } = useAuth();
  const [dbTest, setDbTest] = useState<TestResult>({ status: 'idle' });
  const [authTest, setAuthTest] = useState<TestResult>({ status: 'idle' });
  const [realtimeTest, setRealtimeTest] = useState<TestResult>({ status: 'idle' });
  const [realtimeStatus, setRealtimeStatus] = useState<string>('Not connected');
  const [lastRealtimeEvent, setLastRealtimeEvent] = useState<string>('None');

  useEffect(() => {
    runInitialTests();
  }, []);

  const runInitialTests = async () => {
    await handleTestDatabase();
    await handleTestAuth();
  };

  const handleTestDatabase = async () => {
    setDbTest({ status: 'loading' });
    try {
      const result = await testConnection();

      if (result.success) {
        const { data, error } = await supabase.from('admin_profiles').select('*').limit(1);

        if (error) {
          throw new Error(error.message);
        }

        setDbTest({
          status: 'success',
          message: 'Successfully connected to database',
          details: `Found ${data?.length || 0} admin profile(s)`
        });
      } else {
        throw new Error(result.error || 'Connection failed');
      }
    } catch (error: any) {
      console.error('Database test error:', error);
      setDbTest({
        status: 'error',
        message: error.message || 'Failed to connect to database',
        details: getErrorSuggestion(error.message)
      });
    }
  };

  const handleTestAuth = async () => {
    setAuthTest({ status: 'loading' });
    try {
      const result = await testAuth();

      if (result.success) {
        setAuthTest({
          status: 'success',
          message: user ? `Logged in as ${user.email}` : 'Auth system ready (not logged in)',
          details: user ? `User ID: ${user.id}` : 'Ready for login/signup'
        });
      } else {
        throw new Error(result.error || 'Auth test failed');
      }
    } catch (error: any) {
      console.error('Auth test error:', error);
      setAuthTest({
        status: 'error',
        message: error.message || 'Auth system error',
        details: getErrorSuggestion(error.message)
      });
    }
  };

  const handleTestRealtime = async () => {
    setRealtimeTest({ status: 'loading' });
    setLastRealtimeEvent('Subscribing...');

    try {
      const channel = supabase
        .channel('test-channel')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'admin_profiles'
          },
          (payload) => {
            console.log('Realtime event received:', payload);
            setLastRealtimeEvent(`${payload.eventType} at ${new Date().toLocaleTimeString()}`);
          }
        )
        .subscribe((status) => {
          console.log('Realtime subscription status:', status);
          setRealtimeStatus(status);

          if (status === 'SUBSCRIBED') {
            setRealtimeTest({
              status: 'success',
              message: 'Successfully subscribed to realtime updates',
              details: 'Listening for changes on admin_profiles table'
            });
          } else if (status === 'CHANNEL_ERROR') {
            setRealtimeTest({
              status: 'error',
              message: 'Failed to subscribe to realtime channel',
              details: 'Check if realtime is enabled in Supabase dashboard'
            });
          }
        });

      setTimeout(() => {
        channel.unsubscribe();
        setRealtimeStatus('Disconnected');
      }, 10000);

    } catch (error: any) {
      console.error('Realtime test error:', error);
      setRealtimeTest({
        status: 'error',
        message: error.message || 'Realtime connection failed',
        details: getErrorSuggestion(error.message)
      });
    }
  };

  const getErrorSuggestion = (errorMessage: string): string => {
    if (!errorMessage) return 'Check your Supabase credentials in .env file';

    if (errorMessage.includes('Invalid API key') || errorMessage.includes('JWT')) {
      return '🔑 Invalid API key - Check VITE_SUPABASE_ANON_KEY in .env';
    }
    if (errorMessage.includes('relation') || errorMessage.includes('does not exist')) {
      return '📋 Table not found - Run database migrations first';
    }
    if (errorMessage.includes('permission') || errorMessage.includes('RLS')) {
      return '🔒 Permission denied - Check RLS policies';
    }
    if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      return '🌐 Network error - Check your internet connection';
    }
    return 'Check console for detailed error information';
  };

  const getStatusIcon = (status: TestStatus) => {
    switch (status) {
      case 'loading':
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestStatus) => {
    switch (status) {
      case 'loading':
        return <Badge variant="outline" className="bg-blue-50">Testing...</Badge>;
      case 'success':
        return <Badge className="bg-green-500">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Not tested</Badge>;
    }
  };

  const getRealtimeBadge = () => {
    if (realtimeStatus === 'SUBSCRIBED') {
      return <Badge className="bg-green-500">🟢 Live</Badge>;
    } else if (realtimeStatus === 'CHANNEL_ERROR') {
      return <Badge variant="destructive">🔴 Error</Badge>;
    } else if (realtimeStatus === 'Not connected' || realtimeStatus === 'Disconnected') {
      return <Badge variant="secondary">⚪ {realtimeStatus}</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-50">⚪ Connecting...</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <Activity className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-2 text-3xl font-bold">Supabase Connection Test</h1>
          <p className="text-muted-foreground">
            Verify your database, authentication, and realtime connections
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Environment Variables</AlertTitle>
          <AlertDescription>
            Make sure you have set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.
            <br />
            Get them from: <a href="https://app.supabase.com/project/_/settings/api" target="_blank" rel="noopener noreferrer" className="underline">Supabase Dashboard</a>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle>Database Connection</CardTitle>
                    <CardDescription>Test connection to Supabase PostgreSQL</CardDescription>
                  </div>
                </div>
                {getStatusBadge(dbTest.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(dbTest.status)}
                <div className="flex-1">
                  <p className="font-medium">{dbTest.message || 'Click "Test Database" to check connection'}</p>
                  {dbTest.details && (
                    <p className="mt-1 text-sm text-muted-foreground">{dbTest.details}</p>
                  )}
                </div>
              </div>
              <Button onClick={handleTestDatabase} disabled={dbTest.status === 'loading'}>
                <Database className="mr-2 h-4 w-4" />
                {dbTest.status === 'loading' ? 'Testing...' : 'Test Database'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-amber-600" />
                  <div>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>Test Supabase Auth system</CardDescription>
                  </div>
                </div>
                {getStatusBadge(authTest.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(authTest.status)}
                <div className="flex-1">
                  <p className="font-medium">{authTest.message || 'Click "Test Auth" to check authentication'}</p>
                  {authTest.details && (
                    <p className="mt-1 text-sm text-muted-foreground">{authTest.details}</p>
                  )}
                </div>
              </div>
              <Button onClick={handleTestAuth} disabled={authTest.status === 'loading'}>
                <Lock className="mr-2 h-4 w-4" />
                {authTest.status === 'loading' ? 'Testing...' : 'Test Auth'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radio className="h-6 w-6 text-green-600" />
                  <div>
                    <CardTitle>Realtime Subscription</CardTitle>
                    <CardDescription>Test realtime database updates</CardDescription>
                  </div>
                </div>
                {getRealtimeBadge()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(realtimeTest.status)}
                <div className="flex-1">
                  <p className="font-medium">
                    {realtimeTest.message || 'Click "Test Realtime" to check subscription'}
                  </p>
                  {realtimeTest.details && (
                    <p className="mt-1 text-sm text-muted-foreground">{realtimeTest.details}</p>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Subscription Status: {realtimeStatus}</p>
                <p className="text-sm text-muted-foreground">Last Event: {lastRealtimeEvent}</p>
              </div>

              <Button onClick={handleTestRealtime} disabled={realtimeTest.status === 'loading'}>
                <Radio className="mr-2 h-4 w-4" />
                {realtimeTest.status === 'loading' ? 'Testing...' : 'Test Realtime'}
              </Button>

              {realtimeTest.status === 'success' && (
                <Alert>
                  <AlertDescription className="text-sm">
                    ℹ️ Realtime subscription will automatically close after 10 seconds.
                    Make a change to admin_profiles table to see live updates.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Check browser console for detailed logs</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionTest;
