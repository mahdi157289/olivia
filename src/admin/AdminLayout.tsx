import { NavLink, Outlet } from 'react-router-dom';
import './Admin.css';

export function AdminLayout() {
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <img src="/olivia-logo.png" alt="Olivia" className="admin-logo" />
          <h2 className="admin-title">Technical Archive</h2>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Produits
          </NavLink>
          <NavLink to="/admin/quotes" className={({ isActive }) => isActive ? 'admin-nav-link active' : 'admin-nav-link'}>
            Devis
          </NavLink>
          <NavLink to="/" className="admin-nav-link back-to-site">
            Retour au site
          </NavLink>
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
