
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful!');
    }, 1500);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Account created successfully!');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container px-4 mx-auto max-w-md">
        <div className="bg-background rounded-lg border shadow-sm p-8">
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="text-2xl font-display font-bold tracking-tight inline-flex items-center"
            >
              <span className="text-primary">Nex</span>
              <span>Wave</span>
            </Link>
            <h1 className="text-2xl font-display font-medium mt-6 mb-2">Welcome to NexWave</h1>
            <p className="text-muted-foreground">
              Create an account or sign in to your existing one
            </p>
          </div>
          
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative flex items-center">
                  <Separator className="flex-1" />
                  <span className="mx-2 text-xs text-muted-foreground">or continue with</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" type="button">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" stroke="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                  
                  <Button variant="outline" type="button">
                    <svg className="h-5 w-5 mr-2 text-black dark:text-white" viewBox="0 0 24 24" stroke="none">
                      <path d="M22.451 14.351c-.3.79-1.45 2.75-2.5 3.9-1.35 1.551-2.75 3.1-4.701 3.149-2.05.05-2.7-1.3-5.05-1.3-2.35 0-3.1 1.25-5.05 1.3-2.05.05-3.6-1.8-4.95-3.351-2.7-3.15-4.751-8.9-2-12.751 1.4-1.9 3.55-3.1 6-3.15 1.85-.05 3.6 1.25 4.75 1.25 1.15 0 3.3-1.55 5.551-1.3.95.04 3.6.379 5.301 2.85-8.201 5.45-2.15 13.451 3.65 15.401z" />
                      <path d="M12 4.25c0-2.9 2.35-5.25 5.301-5.55-2.551 1.55-2.801 5.55-.15 7.2-1.801 2.25-4.751 1.85-5.151-1.65z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailSignup">Email</Label>
                  <Input
                    id="emailSignup"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordSignup">Password</Label>
                  <Input
                    id="passwordSignup"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-6">
                <div className="relative flex items-center">
                  <Separator className="flex-1" />
                  <span className="mx-2 text-xs text-muted-foreground">or continue with</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button variant="outline" type="button">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" stroke="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google
                  </Button>
                  
                  <Button variant="outline" type="button">
                    <svg className="h-5 w-5 mr-2 text-black dark:text-white" viewBox="0 0 24 24" stroke="none">
                      <path d="M22.451 14.351c-.3.79-1.45 2.75-2.5 3.9-1.35 1.551-2.75 3.1-4.701 3.149-2.05.05-2.7-1.3-5.05-1.3-2.35 0-3.1 1.25-5.05 1.3-2.05.05-3.6-1.8-4.95-3.351-2.7-3.15-4.751-8.9-2-12.751 1.4-1.9 3.55-3.1 6-3.15 1.85-.05 3.6 1.25 4.75 1.25 1.15 0 3.3-1.55 5.551-1.3.95.04 3.6.379 5.301 2.85-8.201 5.45-2.15 13.451 3.65 15.401z" />
                      <path d="M12 4.25c0-2.9 2.35-5.25 5.301-5.55-2.551 1.55-2.801 5.55-.15 7.2-1.801 2.25-4.751 1.85-5.151-1.65z" />
                    </svg>
                    Apple
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
