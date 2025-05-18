export interface Servicio {
    codigo_servicio: number;
    tipo: 'Vacunación' | 'Desparasitación' | 'Asesoramiento Nutricional' | 'Diagnóstico por Imagen' |
          'TAC' | 'Resonancia Magnética' | 'Hospitalización' | 'Fisioterapia' | 'Cirugía general';
}  