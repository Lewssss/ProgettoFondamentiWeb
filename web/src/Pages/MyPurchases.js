import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyPurchases.css";

function MyPurchases() {
  const [Purchases, setPurchases] = useState([]);
  const [LoadingPurchases, setLoadingPurchases] = useState(true);
  const [PurchasesError, setPurchasesError] = useState("");

  useEffect(() => {
    const FetchPurchases = async () => {
      try {
        const Response = await axios.get("http://localhost:5000/api/purchases");

        setPurchases(Response.data);
      } catch (Error) {
        console.error("Errore nel caricamento degli acquisti:", Error);
        setPurchasesError("Impossibile caricare gli acquisti.");
      } finally {
        setLoadingPurchases(false);
      }
    };

    FetchPurchases();
  }, []);

  const FormatPrice = (Price) =>
    new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(Price);

  return (
    <main className="my-purchases-page">
      <header className="my-purchases-header">
        <Link to="/" className="my-purchases-back">
          ← Torna alla galleria
        </Link>

        <p className="my-purchases-eyebrow">ARTMUSEUM · AREA UTENTE</p>
        <h1>I miei acquisti</h1>
        <p>La cronologia delle opere acquistate nella demo.</p>
      </header>

      {LoadingPurchases && <p role="status">Caricamento degli acquisti...</p>}

      {PurchasesError && (
        <p role="alert" className="my-purchases-error">
          {PurchasesError}
        </p>
      )}

      {!LoadingPurchases && !PurchasesError && Purchases.length === 0 && (
        <section className="my-purchases-empty">
          <h2>La tua collezione inizia qui</h2>
          <p>Non hai ancora acquisti registrati nella demo.</p>
          <Link to="/">Esplora la galleria</Link>
        </section>
      )}

      {!LoadingPurchases && !PurchasesError && Purchases.length > 0 && (
        <>
          <p className="my-purchases-count">
            {Purchases.length}{" "}
            {Purchases.length === 1
              ? "acquisto registrato"
              : "acquisti registrati"}
          </p>

          <section className="my-purchases-list">
            {Purchases.map((Purchase) => (
              <article className="my-purchase-card" key={Purchase._id}>
                <div className="my-purchase-artwork">
                  <span>Art</span>
                </div>

                <div className="my-purchase-info">
                  <h2>{Purchase.title}</h2>
                  <p>{Purchase.artist}</p>
                  <p>
                    Acquistata il{" "}
                    {new Date(Purchase.purchasedAt).toLocaleDateString("it-IT")}
                  </p>
                </div>

                <div className="my-purchase-summary">
                  <strong>{FormatPrice(Purchase.price)}</strong>
                  <span className="my-purchase-status">Acquisto simulato</span>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default MyPurchases;
