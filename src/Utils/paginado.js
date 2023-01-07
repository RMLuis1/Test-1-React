import React from "react";
import { useState } from "react";
import "./paginado.css";
import {
  heartFav,
  heartFavAdd,
  mensajeSinElementos,
} from "./mensajes/mensajes";
import { Favorites, addLocalStoreFav } from "./localStore";
import { Card } from "../component/card/card";

/*
allData => seria todos los elementos de la api

itemsPerPage => cantidad de elementos que se desea por pagina

pageLimit => Numero de paginas que se quiere renderizar. !opcional, por defecto es 5

maxPageLimit=> el maximo de paginas que se quiere renderizar. *opcional, por defecto es 5
*/
export default function Paginado({
  allData,
  itemsPerPage,
  pageLimit,
  maxPageLimit,
}) {
  const favorite = Favorites();
  

  const [pagina, setPagina] = useState(1);
  const [elementosPorPagina] = useState(itemsPerPage ? itemsPerPage : 10);

  const indexUltimoElemento = pagina * elementosPorPagina;
  const indexPrimerElemento = indexUltimoElemento - elementosPorPagina;
  const dataSlice =
    allData.length > 1
      ? allData.slice(indexPrimerElemento, indexUltimoElemento)
      : allData;
  const allDataLength = allData.length;

  const pageNumber = [];
  const [pageNumberLimit /*setPageNumberLimit*/] = useState(
    pageLimit ? pageLimit : 5
  );
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(
    maxPageLimit ? maxPageLimit : 5
  );
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  for (let i = 0; i < Math.ceil(allDataLength / elementosPorPagina); i++) {
    pageNumber.push(i + 1);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setPagina(Number(e.target.id));
  };

  const handleLastPage = (e) => {
    e.preventDefault();
    const maxLimit = Math.ceil(pageNumber.length / 5);
    setMaxPageNumberLimit(maxLimit * 5);
    setMinPageNumberLimit(maxLimit * 5 - 5);
    setPagina(Number(e.target.id));
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setPagina(pagina - 1);
    if (pagina - 1 <= minPageNumberLimit && pagina - 1 > 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setPagina(pagina + 1);
    if (pagina + 1 > maxPageNumberLimit && pagina + 1 <= pageNumber.length) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  //Condicional para que no se pierda el puntero del paginado
  if (maxPageNumberLimit > indexUltimoElemento) {
    setMaxPageNumberLimit(5);
    setMinPageNumberLimit(0);
  }

  const renderPageNumbers = pageNumber.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={pagina === number ? "active" : "numb"}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageDecrementDots = null;
  if (pagina > pageNumberLimit) {
    pageDecrementDots = <li className="dots">...</li>;
  }

  let pageIncrementDots = null;
  if (pageNumber.length > maxPageNumberLimit) {
    pageIncrementDots = <li className="dots">...</li>;
  }

  let showFirstNumber = null;
  if (pagina > pageNumberLimit) {
    showFirstNumber = (
      <li
        id={pageNumber[0]}
        onClick={handleClick}
        className={pagina === 1 ? "active" : "first"}
      >
        {pageNumber[0]}
      </li>
    );
  }

  let showLastNumber = null;
  if (
    pageNumber.length > minPageNumberLimit &&
    pageNumber.length > maxPageNumberLimit
  ) {
    showLastNumber = (
      <li
        id={pageNumber[pageNumber.length - 1]}
        onClick={(e) => handleLastPage(e)}
        className={pagina === pageNumber.length ? "active" : "last"}
      >
        {pageNumber[pageNumber.length - 1]}
      </li>
    );
  }

  return (
    <div className="containerPag">
      <div className="paginado">
        <ul className="paginationUl">
          <li>
            <button
              className="buttonPrev"
              onClick={(e) => handlePrev(e)}
              disabled={pagina - 1 === 0 ? true : false}
            >
              prev
            </button>
          </li>
          {showFirstNumber}
          {pageDecrementDots}
          {renderPageNumbers}
          {pageIncrementDots}
          {showLastNumber}
          <li>
            <button
              className="buttonNext"
              onClick={(e) => handleNext(e)}
              disabled={pagina >= pageNumber.length ? true : false}
            >
              next
            </button>
          </li>
        </ul>
      </div>
      <ul className="cardGridHome">
        {dataSlice.length === 0
          ? mensajeSinElementos
          : dataSlice?.map((e) => (
              <div>
                {favorite.includes(e.id.toString()) ? heartFavAdd : heartFav}
                <Card key={e.id} element={e} />
                <div className="divButtonHeart">
                  
                    <button
                      onClick={(e) => addLocalStoreFav(e)}
                      key={e.title}
                      className="buttonHeart"
                      value={e.id}
                      placeholder="favoritos"
                    >{favorite.includes(e.id.toString()) ? 
                     'Eliminar de Favoritos' : 'Agregar a Favoritos'}
                    </button>
                  
                </div>
              </div>
            ))}
      </ul>
    </div>
  );
}
