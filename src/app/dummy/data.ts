import { Habilidad } from "../types/dtos/habilidad";
import { SolicitudRelevante } from "../types/dtos/solicitud-relevante";
import { SolicitudActiva } from "../types/dtos/solicitud-activa";
import { RolUsuario } from "../types/rol-usuario";
import { EstadoSolicitud } from "../types/estado-solicitud";
import { Solicitud } from "../types/dtos/solicitud";
import { Mensaje } from "../types/dtos/mensaje";
import { Conexion } from "../types/dtos/conexion";
import { Usuario } from "../types/dtos/usuario";

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

export const USER_SKILLS: Habilidad[] = [
    new Habilidad()
    .set('id', 3)
    .set('name', 'Electricidad')
    .set('description', 'Reparacion de instalaciones electricas')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 7)
    .set('name', 'Limpieza')
    .set('description', 'Limpieza de casas')
    .set('categoryId', 1)
    .set('categoryName', 'Hogar'),
    new Habilidad()
    .set('id', 9)
    .set('name', 'Soporte PC')
    .set('description', 'Reparacion de computadoras')
    .set('categoryId', 2)
    .set('categoryName', 'Tecnologia')
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
    .set('requesterProviderConnection', 'Amigo')
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
    .set('requesterProviderConnection', 'Desconocido')
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
    .set('requesterProviderConnection', 'Amigo')
    .set('skill', SKILLS[4]),
]

export const REQUESTS: Solicitud[] = [
    new Solicitud()
    .set('id', 1)
    .set('title', 'Computadora muy lenta')
    .set('description', 'Mi computadora esta muy lenta y no se que hacer')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1234')
    .set('requesterId', 1)
    .set('requesterName', 'Juan')
    .set('requesterLastName', 'Perez')
    .set('providerId', 0)
    .set('providerName', '')
    .set('providerLastName', '')
    .set('requesterProviderConnection', '')
    .set('activeUserRol', null)
    .set('skill', SKILLS[8])
    .set('status', EstadoSolicitud.Abierta),
    new Solicitud()
    .set('id', 2)
    .set('title', 'Cocina rota')
    .set('description', 'Mi cocina esta rota y no se que hacer')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 5643')
    .set('requesterId', 2)
    .set('requesterName', 'Maria')
    .set('requesterLastName', 'Gomez')
    .set('providerId', 0)
    .set('providerName', '')
    .set('providerLastName', '')
    .set('requesterProviderConnection', '')
    .set('activeUserRol', null)
    .set('skill', SKILLS[3])
    .set('status', EstadoSolicitud.Abierta),
    new Solicitud()
    .set('id', 3)
    .set('title', 'Pintura de paredes')
    .set('description', 'Necesito pintar las paredes de mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 8645')
    .set('requesterId', 3)
    .set('requesterName', 'Pedro')
    .set('requesterLastName', 'Rodriguez')
    .set('providerId', 0)
    .set('providerName', '')
    .set('providerLastName', '')
    .set('requesterProviderConnection', '')
    .set('activeUserRol', null)
    .set('skill', SKILLS[4])
    .set('status', EstadoSolicitud.Abierta),
    new Solicitud()
    .set('id', 4)
    .set('title', 'Caño roto')
    .set('description', 'Tengo un caño roto en mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1092')
    .set('requesterId', 4)
    .set('requesterName', 'Jose')
    .set('requesterLastName', 'Gonzalez')
    .set('providerId', 5)
    .set('providerName', 'Gaius')
    .set('providerLastName', 'van Baelsar')
    .set('requesterProviderConnection', 'Amigo')
    .set('activeUserRol', RolUsuario.Ayudante)
    .set('skill', SKILLS[0])
    .set('status', EstadoSolicitud.Activa),
    new Solicitud()
    .set('id', 5)
    .set('title', 'Cortar pasto')
    .set('description', 'Necesito cortar el pasto de mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1091')
    .set('requesterId', 5)
    .set('requesterName', 'Gaius')
    .set('requesterLastName', 'van Baelsar')
    .set('providerId', 0)
    .set('providerName', '')
    .set('providerLastName', '')
    .set('requesterProviderConnection', '')
    .set('activeUserRol', RolUsuario.Solicitante)
    .set('skill', SKILLS[5])
    .set('status', EstadoSolicitud.Abierta)
]

export const ACTIVE_REQUESTS: SolicitudActiva[] = [
    new SolicitudActiva()
    .set('id', 4)
    .set('title', 'Caño roto')
    .set('description', 'Tengo un caño roto en mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1092')
    .set('requesterId', 4)
    .set('requesterName', 'Jose')
    .set('requesterLastName', 'Gonzalez')
    .set('providerId', 5)
    .set('providerName', 'Gaius')
    .set('providerLastName', 'van Baelsar')
    .set('requesterProviderConnection', 'Amigo')
    .set('activeUserRol', RolUsuario.Ayudante)
    .set('skill', SKILLS[0])
    .set('status', EstadoSolicitud.Activa),
    new SolicitudActiva()
    .set('id', 5)
    .set('title', 'Cortar pasto')
    .set('description', 'Necesito cortar el pasto de mi casa')
    .set('timeStart', new Date().setMonth(new Date().getMonth() - 1))
    .set('location', 'Calle 1091')
    .set('requesterId', 5)
    .set('requesterName', 'Gaius')
    .set('requesterLastName', 'van Baelsar')
    .set('providerId', 0)
    .set('providerName', '')
    .set('providerLastName', '')
    .set('requesterProviderConnection', '')
    .set('activeUserRol', RolUsuario.Solicitante)
    .set('skill', SKILLS[5])
    .set('status', EstadoSolicitud.Abierta)
]

export const MESSAGES: Mensaje[] = [
    new Mensaje()
    .set('requestId', 4)
    .set('messageId', 1)
    .set('timeStamp', new Date().setDate(new Date().getDate() - 1))
    .set('senderId', 4)
    .set('senderName', 'Jose')
    .set('senderLastName', 'Gonzalez')
    .set('contents', 'Hola, necesito que vengas a mi casa a arreglar el caño')
    .set('deleted', false),
    new Mensaje()
    .set('requestId', 4)
    .set('messageId', 2)
    .set('timeStamp', new Date().setHours(new Date().getHours() - 1))
    .set('senderId', 5)
    .set('senderName', 'Gaius')
    .set('senderLastName', 'van Baelsar')
    .set('contents', 'Hola, no hay problema, cuando queres que vaya?')
    .set('deleted', false),
]

export const CONNECTIONS: Conexion[] = [
    new Conexion()
    .set('userId', 4)
    .set('email', 'jg@gmail.com')
    .set('name', 'Jose')
    .set('lastName', 'Gonzales')
    .set('nick', 'jgonzales'),
    new Conexion()
    .set('userId', 1)
    .set('email', 'email@email.com')
    .set('name', 'Juan')
    .set('lastName', 'Perez')
    .set('nick', 'jperez')
]

export const PENDING_CONNECTIONS: Conexion[] = [
    new Conexion()
    .set('userId', 2)
    .set('email', 'asd@asd.ce')
    .set('name', 'Maria')
    .set('lastName', 'Gomez')
    .set('nick', 'mgomez'),
    new Conexion()
    .set('userId', 3)
    .set('email', '')
    .set('name', 'Pedro')
    .set('lastName', 'Rodriguez')
    .set('nick', 'prodriguez')
]

export const CONNECTION_SEARCH_RESULTS: Conexion[] = [
    new Conexion()
    .set('userId', 2)
    .set('email', 'asd@asd.ce')
    .set('name', 'Maria')
    .set('lastName', 'Gomez')
    .set('nick', 'mgomez'),
    new Conexion()
    .set('userId', 3)
    .set('email', '')
    .set('name', 'Pedro')
    .set('lastName', 'Rodriguez')
    .set('nick', 'prodriguez'),
    new Conexion()
    .set('userId', 6)
    .set('email', '')
    .set('name', 'Alphinaud')
    .set('lastName', 'Leveilleur')
    .set('nick', 'aleveilleur')
]

export const PROFILES: Usuario[] = [
    new Usuario()
    .set('id', 5)
    .set('email', 'gaius@gmail.com')
    .set('name', 'Gaius')
    .set('lastName', 'van Baelsar')
    .set('nick', 'gvanbaelsar')
]