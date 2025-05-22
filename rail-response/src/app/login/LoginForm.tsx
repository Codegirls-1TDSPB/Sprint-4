'use client'

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Logo } from '../../components/Logo';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarRecuperacao, setMostrarRecuperacao] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');

  // Toggle para usar mock ou API real
  const mock = true; // Coloque false quando o backend estiver no ar

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setErro('');

    if (mock) {
      // Login mocado
      if (email !== 'teste@gmail.com' || senha !== '123456') {
        setErro('Email ou senha incorretos.');
        return;
      }
      localStorage.setItem('tokenFake', 'ok');
      router.push('/dashboard');
    } else {
      // Login via API real
      try {
        const response = await fetch('http://localhost:8080/rail/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErro(errorData.message || 'Erro no login.');
          return;
        }

        const data = await response.json();

        // Supondo que a API retorne um token ou algo parecido
        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        } else {
          setErro('Login falhou, token não retornado.');
        }
      } catch (error) {
        setErro('Erro ao conectar com o servidor.');
      }
    }
  };

  const handleRecuperarSenha = () => {
    if (emailRecuperacao.trim() === '') {
      alert('Por favor, insira seu email.');
      return;
    }
    alert(`Instruções enviadas para: ${emailRecuperacao}`);
    setMostrarRecuperacao(false);
    setEmailRecuperacao('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1b4263] px-4">
      <div className="flex items-start bg-gray-100 p-10 rounded-xl shadow-md w-full max-w-4xl justify-between relative">
        {/* Lado esquerdo */}
        <div className="flex flex-col items-start w-full max-w-xs pt-0 pl-0">
          <Logo className="w-24 h-24 mb-2" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Sign in</h2>
          <p className="text-sm text-gray-600">Use your RailResponse</p>
        </div>

        {/* Lado direito */}
        <div className="w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                id="email"
                type="email"
                placeholder="Seu email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium">
                Senha:
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  className="w-full px-3 py-2 border rounded-md pr-10"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-600"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {erro && (
              <p className="text-red-500 text-sm" role="alert" aria-live="assertive">
                {erro}
              </p>
            )}

            <div>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline"
                onClick={() => setMostrarRecuperacao(!mostrarRecuperacao)}
              >
                Esqueceu email ou senha?
              </button>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Next
              </button>
            </div>
          </form>
        </div>

        {/* Card de recuperação */}
        {mostrarRecuperacao && (
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white border rounded-md shadow-lg p-6 w-[300px] z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recuperacaoTitle"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 id="recuperacaoTitle" className="text-lg font-semibold text-gray-800">
                Recuperar acesso
              </h3>
              <button
                onClick={() => setMostrarRecuperacao(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Fechar recuperação de senha"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Digite seu e-mail para receber as instruções.
            </p>
            <input
              type="email"
              placeholder="exemplo@email.com"
              className="w-full px-3 py-2 border rounded mb-3"
              value={emailRecuperacao}
              onChange={(e) => setEmailRecuperacao(e.target.value)}
              required
              aria-required="true"
            />
            <button
              onClick={handleRecuperarSenha}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Enviar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
