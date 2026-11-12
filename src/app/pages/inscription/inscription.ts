import { Component, Input, OnInit, inject } from '@angular/core'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import {  Cours } from '../../donnees/cours'; 
import { Session } from '../../services/session'; 
import { nomComplet } from '../../validators/nom-complet';  
import { Catalogue } from '../../services/catalogue';
import { Inscriptions } from '../../services/inscriptions';
  
@Component({ 
  selector: 'app-inscription', 
  imports: [ReactiveFormsModule, RouterLink], 
  templateUrl: './inscription.html', 
  styleUrl: './inscription.css', 
}) 
export class Inscription implements OnInit {
inscriptions = inject(Inscriptions);  
envoyer() { 
  const cours = this.cours; 
  if (this.form.invalid || !cours) { 
    this.form.markAllAsTouched(); 
    return; 
  } 
  const v = this.form.getRawValue(); 
  this.inscriptions.ajouter({ 
    coursId: cours.id, 
    nom: v.nom ?? '', 
    email: v.email ?? '', 
    niveau: v.niveau ?? '', 
    date: new Date(), 
  }); 
  this.confirmation = `Merci ${v.nom} ! Votre inscription à « ${cours.titre} » est enregistrée.`; 
  this.form.reset(); 
} 
  private session = inject(Session); 
  private fb  = inject(FormBuilder);
  private catalogue = inject(Catalogue);// injecte le service Catalogue pour accéder aux cours
  
  @Input() id = '';          // reçoit le :id de l'URL 
  confirmation = ''; 
  
  form = new FormGroup({ 
    nom: this.fb.control('', [Validators.required, nomComplet]), 
    email: this.fb.control('', [Validators.required, Validators.email]), 
    telephone: this.fb.control('', [Validators.pattern(/^[0-9]{8}$/)]), 
    niveau: this.fb.control('', [Validators.required]), 
    motivation: this.fb.control('', [Validators.required, Validators.minLength(20)]), 
    conditions: this.fb.control(false, [Validators.requiredTrue]), 
  }); 
 get cours(): Cours | undefined { 
  return this.catalogue.trouver(Number(this.id)); // Récupère le cours correspondant à l'id reçu en entrée
} 
 nbCaracteres = 0;
 ngOnInit() {
  this.form.patchValue({ nom: this.session.nom() });
  this.motivation.valueChanges.subscribe(v => {
    this.nbCaracteres = v?.length ?? 0;
  });
}
  get nom() { return this.form.controls.nom; } 
  get email() { return this.form.controls.email; } 
  get telephone() { return this.form.controls.telephone; } 
  get niveau() { return this.form.controls.niveau; } 
  get motivation() { return this.form.controls.motivation; } 
  get conditions() { return this.form.controls.conditions; } 
  
} 

