import { Injectable, signal } from '@angular/core'; 
  
@Injectable({ providedIn: 'root' }) 
export class Session { 
  connecte = signal(false); 
  nom = signal(''); // Signal pour stocker le nom de l'utilisateur connecté
  connecter(nom: string) { 
    this.nom.set(nom); // Met à jour le signal pour stocker le nom de l'utilisateur connecté
    this.connecte.set(true); // Met à jour le signal pour indiquer que l'utilisateur est connecté
  } 
  deconnecter() { 
    this.nom.set(''); 
    this.connecte.set(false); 
  } 
} 
