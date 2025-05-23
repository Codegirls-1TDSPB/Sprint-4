export interface Alerta {
  id: number;
  mensagem: string;
  date: string;
  hora: string;
  prioridade: string;
  severity: 'Baixo' | 'Médio' | 'Alto';
}
