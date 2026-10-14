import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ArtWorkDetail.css";

function ArtWorkDetail() {
  const { id } = useParams();

  const [ArtWork, setArtWork] = useState(null);
  const [LoadingArtWork, setLoadingArtWork] = useState(true);
  const [ArtWorkError, setArtWorkError] = useState("");

  useEffect(() => {
    const FetchArtWork = async () => {
      try {
        setLoadingArtWork(true);
        setArtWorkError("");

        const Response = await axios.get(
          `http://localhost:5000/api/artworks/${id}`,
        );

        setArtWork(Response.data);
      } catch (Error) {
        console.error("Errore nel caricamento dell'opera:", Error);

        setArtWorkError(
          Error.response?.status === 404
            ? "L'opera non è stata trovata."
            : "Impossibile caricare l'opera. Riprova più tardi.",
        );
      } finally {
        setLoadingArtWork(false);
      }
    };

    FetchArtWork();
  }, [id]);

  if (LoadingArtWork) {
    return <main className="artwork-detail-message">Caricamento opera...</main>;
  }

  if (ArtWorkError) {
    return (
      <main className="artwork-detail-message">
        <p>{ArtWorkError}</p>
        <Link to="/">Torna alla Home</Link>
      </main>
    );
  }

  if (!ArtWork) {
    return null;
  }

  return (
    <main className="artwork-detail">
      <Link to="/" className="artwork-back-link">
        ← Torna alla galleria
      </Link>

      <section className="artwork-detail-layout">
        <div className="artwork-detail-image">
          {ArtWork.image ? (
            <img src={ArtWork.image} alt={ArtWork.title} />
          ) : (
            <div className="artwork-no-image">Immagine non disponibile</div>
          )}
        </div>

        <div className="artwork-detail-info">
          <span className="artwork-detail-category">{ArtWork.category}</span>

          <h1>{ArtWork.title}</h1>
          <h2>{ArtWork.artist}</h2>

          {ArtWork.year && <p>Anno: {ArtWork.year}</p>}

          <p className="artwork-detail-description">
            {ArtWork.description || "Nessuna descrizione disponibile."}
          </p>

          <p className="artwork-detail-price">
            {new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "EUR",
            }).format(ArtWork.price)}
          </p>

          <p>
            {ArtWork.available ? "Disponibile" : "Attualmente non disponibile"}
          </p>

          <button
            type="button"
            disabled={!ArtWork.available}
            onClick={() => {
              alert("Acquisto simulato: funzionalità in arrivo!");
            }}
          >
            {ArtWork.available ? "Acquista opera" : "Non disponibile"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ArtWorkDetail;
