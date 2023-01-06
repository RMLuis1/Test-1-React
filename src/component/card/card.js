import "./card.css";

export function Card({ element }) {
  return (
    <li className="liCard">
      <img className="imagen" src={element.image} alt="Foto" />
      <div className="tituloImg">{element.title}</div>
    </li>
  );
}
