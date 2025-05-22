export interface Alerta {
  id: number;
  message: string;
  date: string;
  severity: 'Baixo' | 'Médio' | 'Alto';
}
