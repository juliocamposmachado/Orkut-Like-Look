import React, { useEffect } from 'react';

// A simple JWT decoder
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
}

interface LoginPageProps {
  onLoginSuccess: (user: { name: string; email: string; picture: string; }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  
  const handleCredentialResponse = (response: any) => {
    const userObject = decodeJwt(response.credential);
    if (userObject) {
      onLoginSuccess({
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
      });
    }
  };

  useEffect(() => {
    const google = (window as any).google;
    if (google) {
      google.accounts.id.initialize({
        client_id: '354404045586-f5raolm0jijajub7ctqlgmtt5o51eb1d.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large', type: 'standard', text: 'signin_with' }
      );
      
      // Optional: Prompt for login automatically on page load
      // google.accounts.id.prompt(); 
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans">
      <main className="flex flex-col items-center">
        <h1 className="text-6xl font-bold text-pink-500 mb-8">orkut</h1>
        <div className="bg-pink-100 border border-pink-300 rounded-lg p-8 w-80">
          <p className="text-sm text-gray-700 mb-4">Acesse o orkut com sua conta Google.</p>
          
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-600 block mb-1">E-mail:</label>
            <input type="email" disabled className="w-full p-1 border border-gray-400 bg-gray-200 rounded-sm" />
          </div>
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-600 block mb-1">Senha:</label>
            <input type="password" disabled className="w-full p-1 border border-gray-400 bg-gray-200 rounded-sm" />
          </div>

          <div className="flex items-center mb-6">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-700">Lembrar meus dados</label>
          </div>

          <div className="flex justify-center items-center flex-col space-y-4">
             <div id="googleSignInButton"></div>
             <a href="#" className="text-blue-600 text-sm hover:underline">Não consegue acessar sua conta?</a>
          </div>
        </div>
         <p className="text-sm text-gray-600 mt-4">
            Ainda não é membro? <a href="#" className="text-blue-600 hover:underline">inscreva-se já</a>
        </p>
      </main>
      <footer className="w-full py-4 fixed bottom-0">
        <div className="container mx-auto text-center text-xs text-gray-500">
            © 2024 Orkut -
            <a href="#" className="text-blue-600 hover:underline mx-1">Sobre o Orkut</a>-
            <a href="#" className="text-blue-600 hover:underline mx-1">Termos de Uso</a>-
            <a href="#" className="text-blue-600 hover:underline mx-1">Privacidade</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
