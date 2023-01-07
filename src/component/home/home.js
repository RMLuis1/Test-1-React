import React, { useEffect, useState } from "react";
import { get } from "../../Utils/ApiClient";
import { Loading } from "../loading/loading";
import { FaBars, FaTimes } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import "./home.css";
import Paginado from "../../Utils/paginado";

export function Home() {
  const [cards, setCards] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const [searchText, serSearchText] = useState("");
  const [orden, setOrden] = useState("");

  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      get().then((data) => {
        setCards(data);
      });
    }
  }, [cards, isInitialRender]);
  // -----------------------------search--------------------

  const handleImput = (e) => {
    e.preventDefault();
    serSearchText(e.target.value);
  };
  // ---------------------------select----------------------
  function handleSort(e) {
    e.preventDefault();
    setOrden(e.target.value);
  }

  // --------------FILTROS POR NOMBRES Y ORDENAMIENTOS--------

  const allData =
    searchText.length >= 1
      ? cards.filter((e) =>
          e.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : orden.length > 1
      ? orden === "ascendente"
        ? cards.sort((a, b) => a.title.localeCompare(b.title))
        : orden === "descendente"
        ? cards.sort((a, b) => b.title.localeCompare(a.title))
        : orden === "mayorPrecio"
        ? cards.sort((a, b) => {
            if (a.price > b.price) {
              return 1;
            }
            if (b.price > a.price) {
              return -1;
            }
            return 0;
          })
        : orden === "menorPrecio"
        ? cards.sort((a, b) => {
            if (a.price > b.price) {
              return -1;
            }
            if (b.price > a.price) {
              return 1;
            }
            return 0;
          })
        : cards
      : cards;

  // -------------------------------------------LOADING------------------------

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
// -------------------------------------------------------------------
  return (
    <div className="containterHome">
      <header>
        <nav class="navbar">
          <p class="logos">Free-Shop</p>
          <div className="hamburger" onClick={handleClick}>
            {click ? (
              <FaTimes size={30} style={{ color: "#ffffff" }} />
            ) : (
              <FaBars size={30} style={{ color: "#ffffff" }} />
            )}
          </div>
          <ul className={click ? "nav-menu activeNav" : "nav-menu"}>
            <li className="nav-item">
              <div className="NavLinks">
                <div className="searchBox">
                  <input
                    className="searchImp"
                    type="search"
                                        placeholder="  Buscar..."
                    onChange={(e) => handleImput(e)}
                  />
                  <button className="searchBot">
                    <FcSearch className="Fc" />{" "}
                  </button>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <div className="NavLinks">
              <select className="selection" onChange={(e) => handleSort(e)}>
                <option value="ALL">Ordenar Articulos</option>
                <option value="ascendente">A-Z</option>
                <option value="descendente">Z-A</option>
                <option value="mayorPrecio">Precio Mayor a menor</option>
                <option value="menorPrecio">Precio Menor a mayor</option>
              </select>
            </div>
            </li>
          </ul>
        </nav>
      </header>

      <Paginado allData={allData} />
    </div>
  );
}
