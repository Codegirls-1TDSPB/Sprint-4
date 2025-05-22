import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/imagens/logo.png" // caminho relativo à pasta 'public'
      alt="Logo RailResponse"
      width={200}
      height={200}
      className={`rounded-full ${className}`}
    />
  );
}
