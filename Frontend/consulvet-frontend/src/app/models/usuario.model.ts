export interface Usuario {
  nombre_usuario: string;
  contraseña: string;
  tipo: "cuidador" | "veterinario" | "centro";
  fecha_alta: string;
  fecha_cambio_contraseña: string;
  cuidador: string;
}