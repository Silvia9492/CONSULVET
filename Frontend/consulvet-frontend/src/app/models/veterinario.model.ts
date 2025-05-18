export interface Veterinario {
  codigo_veterinario: number;
  nombre_completo: string;
  nº_colegiado: string;
  especialidad: 'Medicina Preventiva' | 'Medicina Interna' | 'Oncología' | 'Etología' | 'Dermatología' |
                'Traumatología' | 'Neurología' | 'Fisioterapia y Rehabilitación';
  servicio: 'Vacunación' | 'Desparasitación' | 'Asesoramiento Nutricional' | 'Diagnóstico por Imagen' |
            'TAC' | 'Resonancia Magnética' | 'Hospitalización' | 'Fisioterapia' | 'Cirugía general';
  email: string;
  centro_id: number;
}