import { useNavigate } from 'react-router-dom';
import './Admin.css';

const MOCK_PRODUCTS = [
  { id: '1', title: 'Peinture Intérieure Premium', price: 145, status: 'En stock', category: 'Peinture' },
  { id: '2', title: 'Peinture Extérieure Pro', price: 210, status: 'En stock', category: 'Peinture' },
  { id: '3', title: 'Rénovation Cabinets', price: null, status: 'Service', category: 'Rénovation' },
  { id: '4', title: 'Peinture Éco-Solutions', price: 135, status: 'Stock Faible', category: 'Éco' },
];

export function ProductsInventory() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-info">
          <h1 className="admin-page-title">Archives des Produits</h1>
          <p className="admin-page-subtitle">Gestion de l'inventaire technique</p>
        </div>
        <button className="admin-btn-primary" onClick={() => navigate('/admin/products/new')}>
          <span>+ Ajouter un produit</span>
        </button>
      </header>

      <div className="admin-card inventory-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID Unique</th>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix (TND)</th>
              <th>Statut</th>
              <th className="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PRODUCTS.map((product) => (
              <tr key={product.id}>
                <td className="tech-font">#{product.id.padStart(4, '0')}</td>
                <td className="product-cell">
                  <div className="product-info-compact">
                    <span className="product-title">{product.title}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td className="tech-font">{product.price ? `${product.price}.00` : 'Sur Devis'}</td>
                <td>
                  <span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                    {product.status}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit" onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
                    Éditer
                  </button>
                  <button className="action-btn delete">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
