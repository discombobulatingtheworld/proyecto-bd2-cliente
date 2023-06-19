import { Habilidad } from "../types/dtos/habilidad";

export const SKILLS: Habilidad[] = [
    new Habilidad()
    .set('id', 1)
    .set('name', 'Plomeria')
    .set('description', 'Reparacion de cañerias')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 2)
    .set('name', 'Carpinteria')
    .set('description', 'Reparacion de muebles')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 3)
    .set('name', 'Electricidad')
    .set('description', 'Reparacion de instalaciones electricas')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 4)
    .set('name', 'Cocina')
    .set('description', 'Reparacion de artefactos de cocina')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 5)
    .set('name', 'Pintura')
    .set('description', 'Reparacion de paredes')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 6)
    .set('name', 'Jardineria')
    .set('description', 'Mantenimiento de jardines')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 7)
    .set('name', 'Limpieza')
    .set('description', 'Limpieza de casas')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 8)
    .set('name', 'Cuidado de niños')
    .set('description', 'Cuidado de niños')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
]