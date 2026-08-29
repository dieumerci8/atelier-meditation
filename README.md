# Atelier Méditation — MVP interne

Ouvrez `index.html` dans un navigateur. L’application fonctionne sans installation et conserve les méditations approuvées dans le stockage local du navigateur.

## Ce que couvre le MVP

- préparation à 07:00 et 19:00, fuseau `Africa/Lubumbashi` ;
- passage, méditation, plan, prière et aperçu Facebook ;
- contrôle humain obligatoire avant approbation ;
- conservation locale des brouillons approuvés ;
- export JSON destiné à un futur workflow n8n ;
- rappel du consentement requis pour WhatsApp Business.

## Limites volontaires

Le MVP ne publie pas réellement et n’appelle pas encore d’IA ni d’API biblique. Les identifiants n8n, Meta et WhatsApp Business devront être configurés côté serveur avant mise en production. Ne placez jamais de secret d’API dans `app.js`.

## Format d’intégration

Le bouton **Exporter pour n8n** produit un JSON avec le contenu, le statut, les horaires, les cibles et le drapeau `requiresHumanApproval`. Un webhook n8n pourra recevoir ce format, créer une demande d’approbation, puis router uniquement le contenu approuvé.

