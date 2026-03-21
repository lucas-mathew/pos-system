import{
  calculateTotalProducts,
  calculateTotalProfit,
  calculateTotaCapital,
  calculateTotalSales,
} from "./utils/calculations.js";
import { renderPage } from "./utils/aside.js";

document.querySelector(".aside").innerHTML = renderPage();

document.querySelector("#total-products-displayer").innerHTML =
  calculateTotalProducts();

document.querySelector("#total-capital-displayer").innerHTML =
  `$ ${calculateTotaCapital()}`;

document.querySelector("#total-profit-displayer").innerHTML =
  `$ ${calculateTotalProfit()} `;

document.querySelector("#sales-displayer").innerHTML =
  `$${calculateTotalSales()} `;
