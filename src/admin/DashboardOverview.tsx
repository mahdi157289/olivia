import { useState, useEffect } from 'react';
import './Admin.css';

export function DashboardOverview() {
  const [stats, setStats] = useState({ quotes: 0, products: 0, pending: 0 });
  const [recentQuotes, setRecentQuotes] = useState([]);

  useEffect(() => {
    // We'll replace this with real fetch calls later
    setStats({ quotes: 12, products: 6, pending: 4 });
    setRecentQuotes([
      { id: 1, name: 'Jean Dupont', product: 'Peinture Intérieure', status: 'pending', date: '2024-05-12' },
      { id: 2, name: 'Marie Curie', product: 'Rénovation Cabinets', status: 'completed', date: '2024-05-11' },
      { id: 3, name: 'Paul Valery', product: 'Lasure Bois', status: 'pending', date: '2024-05-10' },
    ]);
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-info">
          <h1 className="admin-page-title">Tableau de Bord</h1>
          <p className="admin-page-subtitle">Statistiques système et flux d'activité</p>
        </div>
      </header>

      <div className="admin-stats-grid">
        <div className="stat-card">
          <span className="stat-label">Dossiers Devis</span>
          <span className="stat-value">{stats.quotes}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unités en Stock</span>
          <span className="stat-value">{stats.products}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Actions Requises</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="form-section-title">Journal d'Activité Récent</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Identité Client</th>
              <th>Référence Produit</th>
              <th>Statut Log</th>
              <th>Horodatage</th>
            </tr>
          </thead>
          <tbody>
            {recentQuotes.map((quote: any) => (
              <tr key={quote.id}>
                <td>
                  <span className="client-name">{quote.name}</span>
                </td>
                <td>{quote.product}</td>
                <td>
                  <span className={`status-badge ${quote.status}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="tech-font">{quote.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
