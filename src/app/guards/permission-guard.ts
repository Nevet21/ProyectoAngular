import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { PermissionService } from '../services/permission-service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // No valida si está logueado, omite esa parte

    // Obtiene el permiso requerido desde la data de la ruta
    const requiredPermission = route.data['requiredPermission'] as string;

    // Obtiene los permisos almacenados (de PermissionService, que lee de sessionStorage)
    const permissions = this.permissionService.getPermissions();

    // Si no hay permisos guardados, o no se especifica permiso requerido, permite acceso
    if (!permissions || permissions.length === 0 || !requiredPermission) {
      return true;
    }

    // Verifica si el usuario tiene el permiso requerido
    const hasPermission = permissions.some(p => p.url === requiredPermission);

    if (hasPermission) {
      // Permiso válido, permite activar la ruta
      return true;
    } else {
      // No tiene permiso, redirige a página de acceso denegado
      return this.router.createUrlTree(['/access-denied']);
    }
  }
}
