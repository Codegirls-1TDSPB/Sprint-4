'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  customTitleClass?: string;
}

export default function Header({ customTitleClass = "" }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tokenFake");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenFake");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#112b3C] text-[#EFEFEF]">
      <h1 className={`text-xl font-bold ${customTitleClass}`}>
        <Link href="/">RailResponse</Link>
      </h1>

      <nav>
        <ul className="flex items-center gap-16">
          <li className="px-3">
            <Link href="/" className="hover:underline">
              Início
            </Link>
          </li>

          {isLoggedIn && (
            <li className="px-3">
              <Link href="/" className="hover:underline">
                x
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li className="px-3">
              <button
                onClick={handleLogout}
                className="border border-orange-500 text-orange-500 px-3 py-1 rounded hover:bg-orange-500 hover:text-white transition"
                type="button"
              >
                Sair
              </button>
            </li>
          ) : (
            <>
              <li className="px-3">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li className="px-3">
                <Link href="/cadastro" className="hover:underline">
                  Cadastro
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
