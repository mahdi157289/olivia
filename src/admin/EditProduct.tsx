import { useNavigate, useParams } from 'react-router-dom';
import './Admin.css';

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-info">
          <button className="back-btn" onClick={() => navigate('/admin/products')}>
            ← Retour à l'inventaire
          </button>
          <h1 className="admin-page-title">
            {isNew ? 'Nouveau Dossier Produit' : `Édition : #${id?.padStart(4, '0')}`}
          </h1>
          <p className="admin-page-subtitle">Spécifications techniques du produit</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn-ghost" onClick={() => navigate('/admin/products')}>
            Annuler
          </button>
          <button className="admin-btn-primary">
            <span>Enregistrer les modifications</span>
          </button>
        </div>
      </header>

      <div className="admin-form-container">
        <div className="admin-form-grid">
          <div className="form-section main-info">
            <div className="admin-card form-card">
              <h3 className="form-section-title">Informations Générales</h3>
              <div className="form-group">
                <label>Nom du Produit</label>
                <input type="text" placeholder="Ex: Peinture Intérieure Premium" className="admin-input" />
              </div>
              <div className="form-group">
                <label>Description (Markdown supporté)</label>
                <textarea rows={6} className="admin-input" placeholder="Décrivez les propriétés techniques..."></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Prix (TND)</label>
                  <input type="number" placeholder="0.00" className="admin-input" />
                </div>
                <div className="form-group">
                  <label>Catégorie</label>
                  <select className="admin-input">
                    <option>Peinture</option>
                    <option>Rénovation</option>
                    <option>Éco</option>
                    <option>Décoratif</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="admin-card form-card">
              <h3 className="form-section-title">Détails Techniques</h3>
              <div className="form-group">
                <label>Points Clés (un par ligne)</label>
                <textarea rows={4} className="admin-input" placeholder="Finition mate veloutée&#10;Séchage rapide&#10;..."></textarea>
              </div>
            </div>
          </div>

          <div className="form-section media-info">
            <div className="admin-card form-card">
              <h3 className="form-section-title">Visuels</h3>
              <div className="image-upload-placeholder">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <p>Glissez une image ou cliquez pour parcourir</p>
                <span className="upload-limit">Format JPG, PNG ou AVIF. Max 2MB.</span>
              </div>
              
              <div className="gallery-previews">
                <div className="gallery-slot empty"></div>
                <div className="gallery-slot empty"></div>
                <div className="gallery-slot empty"></div>
              </div>
            </div>

            <div className="admin-card form-card warning-card">
              <h3 className="form-section-title">Statut d'Archivage</h3>
              <div className="toggle-group">
                <label className="admin-toggle">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                  <span className="toggle-label">Produit Public</span>
                </label>
              </div>
              <p className="form-help-text">
                Si désactivé, le produit ne sera pas visible dans le catalogue public mais restera dans les archives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
