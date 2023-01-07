import { Home } from "../component/home/home";
import { render, screen, fireEvent } from "@testing-library/react";

describe("test para cards de la aplicacion", () => {
  let search, select;
  beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(<Home />);
    search = screen.getByPlaceholderText("Buscar...");
    select = screen.getByText("Ordenar Articulos");
    // loading = screen.getByLabelText(});
  });

  test("should first", () => {
    expect(search).toBeInTheDocument();
  });
  test("select option", () => {
    expect(select).not.toBeChecked();
  });
  test("select option checked", () => {
    //   expect(select).toBeChecked();
    fireEvent.click(select);
    expect(select).toBeChecked();
  });
});
