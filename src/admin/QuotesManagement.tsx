import './Admin.css';

const MOCK_QUOTES = [
  { id: '1', name: 'Amine Ben Salem', email: 'amine@test.com', product: 'Peinture Intérieure Premium', status: 'En attente', date: '2026-05-12' },
  { id: '2', name: 'Sarah Mansour', email: 'sarah.m@test.com', product: 'Rénovation Cabinets', status: 'Traité', date: '2026-05-11' },
  { id: '3', name: 'Karim Dridi', email: 'k.dridi@test.com', product: 'Peinture Extérieure Pro', status: 'Urgent', date: '2026-05-10' },
];

export function QuotesManagement() {
  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-info">
          <h1 className="admin-page-title">Gestion des Devis</h1>
          <p className="admin-page-subtitle">Flux des demandes clients</p>
        </div>
      </header>

      <div className="admin-card quotes-card">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Réf</th>
                <th>Client</th>
                <th>Produit / Service</th>
                <th>Date</th>
                <th>Statut</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_QUOTES.map((quote) => (
                <tr key={quote.id}>
                  <td className="tech-font">Q-{quote.id.padStart(3, '0')}</td>
                  <td className="client-cell">
                    <div className="client-info">
                      <span className="client-name">{quote.name}</span>
                      <span className="client-email">{quote.email}</span>
                    </div>
                  </td>
                  <td>{quote.product}</td>
                  <td className="tech-font">{quote.date}</td>
                  <td>
                    <span className={`status-badge ${quote.status.toLowerCase().replace(' ', '-')}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-btn view">Détails</button>
                    <button className="action-btn resolve">Terminer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
