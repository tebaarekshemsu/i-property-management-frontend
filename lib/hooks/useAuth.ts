import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authService, SignupData } from '../services/auth.service';

export const useAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [error, setError] = useState("");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [signupSuccessIdentifier, setSignupSuccessIdentifier] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedRedirect = localStorage.getItem("redirectAfterLogin");
    if (storedRedirect) {
      setRedirectTo(storedRedirect);
      localStorage.removeItem("redirectAfterLogin");
    }

    if (isLogin && signupSuccessIdentifier) {
      setIdentifier(signupSuccessIdentifier);
      setSignupSuccessIdentifier(null);
    }
  }, [isLogin, signupSuccessIdentifier]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password || (!isLogin && !name)) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      if (isLogin) {
        const token = await authService.login(identifier, password);
        localStorage.setItem("token", token);
        const decoded = authService.decodeToken(token);
        
        toast.success("Sign in successful!");
        
        if (decoded.role === "admin") {
          router.push("/admin");
        } else if (decoded.role === "super-admin") {
          router.push("/super-admin");
        } else {
          router.push(redirectTo || "/user");
        }
      } else {
        const signupData: SignupData = {
          phone_no: identifier,
          name,
          password,
          invitation_code: invitationCode || "",
          invited_by: 0,
        };

        await authService.signup(signupData);
        toast.success("Signup successful. Redirecting to login...");
        setSignupSuccessIdentifier(identifier);
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred. Please try again.");
    }
  };

  return {
    isLogin,
    setIsLogin,
    identifier,
    setIdentifier,
    password,
    setPassword,
    name,
    setName,
    invitationCode,
    setInvitationCode,
    error,
    handleSubmit,
  };
}; 