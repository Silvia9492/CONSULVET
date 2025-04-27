export interface Veterinario {
  codigo_veterinario: number;
  nombre_completo: string;
  nº_colegiado: string;
  especialidad: 'Medicina Preventiva' | 'Medicina Interna' | 'Oncología' | 'Etología' | 'Dermatología' | 'Traumatología' | 'Neurología' | 'Fisioterapia y Rehabilitación';
  email: string;
  centro_id: number;
}
