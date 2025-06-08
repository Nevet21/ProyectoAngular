export interface EntityAction {
  label: string;           // Texto del botón
  route?: (row: any) => string; // Función que devuelve ruta (opcional)
  action?: (row: any) => void;  // Función a ejecutar (opcional)
  isDelete?: boolean;      // Si es acción de eliminación
  icon?: string;           // Nombre del icono (Material Icons)
  color?: 'primary' | 'accent' | 'warn'; // Color del botón
  tooltip?: string;        // Texto para tooltip
}