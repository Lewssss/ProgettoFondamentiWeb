import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Gavel,
  Palette,
  Search,
  Sparkles,
} from "lucide-react";
import "./Home.css";

const artworks = [
  {
    id: 1,
    title: "La luce del silenzio",
    artist: "Elena Moretti",
    year: "2023",
    price: 1250,
    category: "Pittura contemporanea",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    title: "Forme in movimento",
    artist: "Luca Ferri",
    year: "2024",
    price: 980,
    category: "Arte astratta",
    image:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    title: "Oltre l'orizzonte",
    artist: "Sofia Ricci",
    year: "2022",
    price: 1750,
    category: "Arte moderna",
    image:
      "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",
  },
];

function Home() {
  return (
    <main className="museum-home">
      <header className="museum-header">
        <Link to="/" className="museum-brand">
          <span className="brand-symbol">
            <Palette size={22} />
          </span>
          <span>
            <strong>ARTMUSEUM</strong>
            <small>UN MONDO DA SCOPRIRE</small>
          </span>
        </Link>

        <nav className="museum-nav">
          <a href="#collezione">Collezione</a>
          <a href="#esperienza">Il museo</a>
          <a href="#aste">Aste</a>
        </nav>

        <div className="museum-header-actions">
          <Link to="/login" className="museum-login">
            Accedi
          </Link>
          <Link to="/register" className="museum-register">
            Registrati <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      <section className="museum-hero">
        <div className="hero-copy">
          <span className="museum-eyebrow">
            <Sparkles size={15} />
            L'ARTE, COME NON L'HAI MAI VISSUTA
          </span>

          <h1>
            Ogni opera
            <br />
            racconta <em>una storia.</em>
          </h1>

          <p>
            Esplora nuove prospettive, incontra artisti straordinari e lasciati
            sorprendere da una collezione senza confini.
          </p>

          <div className="hero-actions">
            <a href="#collezione" className="museum-primary-button">
              Esplora la collezione <ArrowRight size={18} />
            </a>
            <a href="#esperienza" className="museum-secondary-button">
              Scopri il museo <ArrowDown size={16} />
            </a>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot" />
            Un museo digitale, aperto a tutti
          </div>
        </div>

        <div className="hero-artwork">
          <div className="hero-artwork-frame">
            <img
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=90"
              alt="Opera d'arte esposta nella collezione digitale"
            />
          </div>

          <div className="hero-artwork-label">
            <div>
              <span>OPERA IN EVIDENZA</span>
              <strong>Visioni contemporanee</strong>
              <small>Una nuova prospettiva sull'arte</small>
            </div>
            <span className="hero-artwork-number">01 / 03</span>
          </div>

          <span className="hero-decoration hero-decoration-one" />
          <span className="hero-decoration hero-decoration-two" />
        </div>

        <span className="hero-index">ART / EXPERIENCE / DISCOVER</span>
      </section>

      <section className="museum-stats" id="esperienza">
        <div>
          <span className="stat-number">01</span>
          <span className="stat-label">Esplora nuove collezioni</span>
        </div>
        <div>
          <span className="stat-number">02</span>
          <span className="stat-label">Scopri gli artisti</span>
        </div>
        <div>
          <span className="stat-number">03</span>
          <span className="stat-label">Partecipa alle aste</span>
        </div>
        <p>
          Non solo osservare l'arte.
          <br />
          <strong>Entra a farne parte.</strong>
        </p>
      </section>

      <section className="museum-collection" id="collezione">
        <div className="section-heading">
          <div>
            <span className="museum-eyebrow">UNA SELEZIONE PER TE</span>
            <h2>
              Opere <em>in evidenza</em>
            </h2>
            <p>Lasciati ispirare dalle opere della nostra collezione.</p>
          </div>

          <button
            className="collection-search"
            type="button"
            onClick={() =>
              document
                .getElementById("catalogo-preview")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <Search size={17} />
            Esplora le opere
          </button>
        </div>

        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <article className="artwork-card" key={artwork.id}>
              <div className="artwork-image">
                <img src={artwork.image} alt={artwork.title} />
                <span className="artwork-category">{artwork.category}</span>
              </div>

              <div className="artwork-details">
                <div>
                  <h3>{artwork.title}</h3>
                  <p>
                    {artwork.artist} · {artwork.year}
                  </p>
                </div>

                <div className="artwork-price">
                  <span>Prezzo indicativo</span>
                  <strong>{artwork.price.toLocaleString("it-IT")} €</strong>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="museum-disclaimer" id="catalogo-preview">
          Opere e prezzi sono dimostrativi. Il catalogo sarà collegato a MongoDB
          nelle prossime fasi.
        </p>
      </section>

      <section className="museum-auction" id="aste">
        <div className="auction-icon">
          <Gavel size={27} />
        </div>

        <div className="auction-copy">
          <span className="museum-eyebrow">IL PROSSIMO CAPITOLO</span>
          <h2>
            L'arte è anche <em>partecipazione.</em>
          </h2>
          <p>
            Scopri le aste digitali, segui le offerte e prova l'emozione di
            conquistare un'opera.
          </p>
        </div>

        <Link to="/register" className="museum-primary-button">
          Entra nel museo <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="museum-footer">
        <Link to="/" className="museum-brand">
          <span className="brand-symbol">
            <Palette size={20} />
          </span>
          <strong>ARTMUSEUM</strong>
        </Link>

        <p>Un nuovo modo di vivere l'arte.</p>
        <span>Progetto dimostrativo · 2026</span>
      </footer>
    </main>
  );
}

export default Home;
