/*
  App.js

  Este archivo renderiza el Navigation para poder navegar entre las diferentes vistas que 
  contiene este proyecto.

  Navigator se extrae de la carpeta Navigations.
*/

// Módulos de npm
import React from 'react';
// Componente Navigation
import Navigation from './app/navigations/Navigation';

// Funcion App
export default function App() {
  // Retornamos Navigation
  return <Navigation />;
}