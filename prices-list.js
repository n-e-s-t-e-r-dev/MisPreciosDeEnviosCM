const prices = {
  monthBasic: 6.3,
  monthAdvance: 10.4,
  yearlyBasic: 72,
  yearlyAdvance: 112,
  biennialBasic: 128,
  biennialAdvance: 215,
};

const discountedPrices = {
  monthBasic: 7,
  monthAdvance: 12,
  yearlyBasic: 90.3,
  yearlyAdvance: 138.4,
  biennialBasic: 168,
  biennialAdvance: 264,
};

const billingDescriptions = {
  monthBasic: "Se facturará $72.6 por 12 meses de servicio por usuario.",
  monthAdvance: "Se facturará $128 por 12 meses de servicio por usuario.",
  yearlyBasic: "Se facturará $72 por 12 meses de servicio por usuario.",
  yearlyAdvance: "Se facturará $112 por 12 meses de servicio por usuario.",
  biennialBasic: "Se facturará $128 por 24 meses de servicio por usuario.",
  biennialAdvance: "Se facturará $215 por 24 meses de servicio por usuario.",
};

const purchaseLinks = {
  monthBasic:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*B%C3%A1sico*%20por%20mes%20c%C3%B3digo%20de%20registro%20*BCMM*%20Gracias",
  monthAdvance:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*Avanzado*%20por%20mes%20c%C3%B3digo%20de%20registro%20*ACMM*%20Gracias",
  yearlyBasic:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*B%C3%A1sico*%20por%20a%C3%B1o%20c%C3%B3digo%20de%20registro%20*BCMA*%20Gracias",
  yearlyAdvance:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*Avanzado*%20por%20a%C3%B1o%20c%C3%B3digo%20de%20registro%20*ACMA*%20Gracias",
  biennialBasic:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*B%C3%A1sico*%20por%2024%20meses%20c%C3%B3digo%20de%20registro%20*BCMD*%20Gracias",
  biennialAdvance:
    "https://wa.me/573134318776?text=Hola%20me%20encantar%C3%ADa%20adquirir%20el%20plan%20*Avanzado*%20por%2024%20meses%20c%C3%B3digo%20de%20registro%20*ACMD*%20Gracias",
};

document.addEventListener("DOMContentLoaded", function () {
  const priceSelector = document.getElementById("price-selector");
  const pricingCards = document.querySelectorAll(".pricing-card");

  // Establecer por defecto la opción mensual
  updatePrices("biennial");

  // Detectar el clic sobre los planes (Mensual, Anual, Bienal)
  priceSelector.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      const selectedPlan = e.target.getAttribute("data-plan");

      // Resaltar la opción seleccionada
      document.querySelectorAll("#price-selector li").forEach((li) => {
        li.classList.remove("selected");
      });
      e.target.classList.add("selected");

      // Actualizar los precios según el plan seleccionado
      updatePrices(selectedPlan);
    }
  });

  // Función para actualizar los precios y enlaces de compra
  function updatePrices(plan) {
    pricingCards.forEach((card) => {
      const planCard = card.getAttribute("data-plan"); // obtener el tipo de plan de la tarjeta (basic/advance)

      // Variables para almacenar los valores de precios, descuentos, descripciones y enlaces
      let price, discountedPrice, billingDescription, purchaseLink;

      // Construir la clave del plan
      let planKey =
        (plan === "monthly"
          ? "month"
          : plan === "yearly"
          ? "yearly"
          : "biennial") +
        planCard.charAt(0).toUpperCase() +
        planCard.slice(1);

      // Asignar los valores según el plan
      price = prices[planKey];
      discountedPrice = discountedPrices[planKey];
      billingDescription = billingDescriptions[planKey];
      purchaseLink = purchaseLinks[planKey]; // Obtener el enlace de compra correspondiente

      // Actualizar el contenido de la tarjeta con los nuevos valores
      card.querySelector("span").textContent =
        plan === "monthly"
          ? `$${price} / mes`
          : plan === "yearly"
          ? `$${price} por año`
          : `$${price} por 24 meses`;

      card.querySelector("s").textContent = `$${discountedPrice}`;

      card.querySelector("i").textContent = billingDescription;

      // Actualizar el enlace de compra con el enlace correcto
      const buyButton = card.querySelector("a");
      buyButton.setAttribute("href", purchaseLink);
    });
  }
});
