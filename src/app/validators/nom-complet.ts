import { AbstractControl, ValidationErrors } from '@angular/forms'; 
export function nomComplet(control: AbstractControl): ValidationErrors | null { //  Validator pour vérifier si le nom est complet (au moins deux mots)
  const mots = (control.value ?? '').trim().split(/\s+/).filter(Boolean); // Sépare le nom en mots et filtre les mots vides
  return mots.length >= 2 ? null : { nomComplet: true }; // Retourne null si le nom est complet, sinon un objet d'erreur
} 
