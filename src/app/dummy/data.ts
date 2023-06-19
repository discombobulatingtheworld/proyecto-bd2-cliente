import { Habilidad } from "../types/dtos/habilidad";
import { SolicitudRelevante } from "../types/dtos/solicitud-relevante";

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
    new Habilidad()
    .set('id', 9)
    .set('name', 'Soporte PC')
    .set('description', 'Reparacion de computadoras')
    .set('categoryId', 2)
    .set('categoryName', 'Tecnologia'),
]

export const RELEVANT_REQUESTS: SolicitudRelevante[] = [
    new SolicitudRelevante()
    .set('id', 1)
    .set('title', 'Computadora muy lenta')
    .set('description', 'Mi computadora esta muy lenta y no se que hacer')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1234')
    .set('requesterId', 1)
    .set('requesterName', 'Juan')
    .set('requesterLastName', 'Perez')
    .set('requesterConnection', 'Amigo')
    .set('skill', SKILLS[8]),
    new SolicitudRelevante()
    .set('id', 2)
    .set('title', 'Cocina rota')
    .set('description', 'Mi cocina esta rota y no se que hacer')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 5643')  
    .set('requesterId', 2)
    .set('requesterName', 'Maria')
    .set('requesterLastName', 'Gomez')
    .set('requesterConnection', 'Desconocido')
    .set('skill', SKILLS[3]),
    new SolicitudRelevante()
    .set('id', 3)
    .set('title', 'Pintura de paredes')
    .set('description', 'Necesito pintar las paredes de mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 8645')
    .set('requesterId', 3)
    .set('requesterName', 'Pedro')
    .set('requesterLastName', 'Rodriguez')
    .set('requesterConnection', 'Amigo')
    .set('skill', SKILLS[4]),
]