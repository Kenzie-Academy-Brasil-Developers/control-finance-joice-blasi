let clickedBtn = null;

function openModal() {
  const main = document.getElementById("app");

  const divScreen = document.createElement("div");
  const divModal = document.createElement("div");
  const sectionHeader = document.createElement("section");
  const h3 = document.createElement("h3");
  const buttonClose = document.createElement("button");
  const sectionBody = document.createElement("body");
  const pText = document.createElement("p");
  const pValue = document.createElement("p");
  const input = document.createElement("input");
  const pType = document.createElement("p");
  const buttonDeposit = document.createElement("button");
  const buttonWithdraw = document.createElement("button");
  const divButtonsModal = document.createElement("div");
  const buttonCancel = document.createElement("button");
  const buttonInsert = document.createElement("button");

  divScreen.classList.add(
    "div-screen",
    "full",
    "bg-grey-opacity",
    "position-fix",
    "top-left",
    "flex",
    "align-center",
    "justify-center"
  );
  divModal.classList.add("div-modal", "bg-white", "padding-2");
  sectionHeader.classList.add(
    "section-header-modal",
    "flex",
    "justify-between",
    "align-center",
    "margin-3"
  );
  h3.classList.add("title-modal", "title-2-bold", "color-grey-1");
  buttonClose.classList.add(
    "button-close-modal",
    "padding-3",
    "bg-grey-5",
    "color-grey-2",
    "title-2-bold"
  );
  sectionBody.classList.add("section-body-modal", "flex", "flex-col");
  pText.classList.add("color-grey-2", "text-1-bold", "margin-3");
  pValue.classList.add("color-grey-1", "text-2-medium", "margin-4");
  input.classList.add("input-modal", "padding-4", "margin-3");
  pType.classList.add("color-grey-1", "text-2-medium", "margin-4");
  buttonDeposit.classList.add(
    "button-deposit-modal",
    "margin-4",
    "text-3-medium"
  );
  buttonWithdraw.classList.add(
    "button-withdraw-modal",
    "margin-3",
    "text-3-medium"
  );
  divButtonsModal.classList.add("flex", "justify-between");
  buttonCancel.classList.add("button-cancel-modal", "text-3-medium");
  buttonInsert.classList.add("button-insert-modal", "text-3-medium");

  buttonDeposit.addEventListener("click", () => {
    clickedBtn = 1;
  });
  buttonWithdraw.addEventListener("click", () => {
    clickedBtn = 2;
  });

  h3.innerText = "Registro de valor";
  buttonClose.innerText = "X";
  buttonClose.addEventListener("click", () => {
    const divScn = document.querySelector(".div-screen");
    divScn.remove();
  });
  pText.innerText =
    "Digite o valor e em seguida aperte no botão referente ao tipo de valor";
  pValue.innerText = "Valor";
  input.type = "number";
  input.placeholder = "R$ 00,00";
  pType.innerText = "Tipo de valor";
  buttonDeposit.innerText = "Entrada";
  buttonWithdraw.innerText = "Saída";
  buttonDeposit.addEventListener("click", () => {
    buttonDeposit.classList.toggle("button-clicked");
    buttonWithdraw.classList.remove("button-clicked");
  });

  buttonWithdraw.addEventListener("click", () => {
    buttonWithdraw.classList.toggle("button-clicked");
    buttonDeposit.classList.remove("button-clicked");
  });

  buttonCancel.innerText = "Cancelar";
  buttonCancel.addEventListener("click", () => {
    const divScn = document.querySelector(".div-screen");
    divScn.remove();
  });

  buttonInsert.innerText = "Inserir valor";
  buttonInsert.addEventListener("click", () => {
    if (clickedBtn && input.value > 0) {
      const item = {
        id: insertedValues.length + 1,
        value: Number(input.value),
        categoryID: clickedBtn,
      };
      insertedValues.push(item);
      addFinancialRecord(insertedValues);
      clickedBtn = null;
      const divScn = document.querySelector(".div-screen");
      divScn.remove();
    } else if (!clickedBtn) {
      alert("Selecione o tipo de valor!");
    } else if (input.value < 0) {
      input.value = 0;
      alert("Digite um valor válido!");
    }
  });

  main.appendChild(divScreen);
  divScreen.appendChild(divModal);
  divModal.append(sectionHeader, sectionBody);
  sectionHeader.append(h3, buttonClose);
  sectionBody.append(
    pText,
    pValue,
    input,
    pType,
    buttonDeposit,
    buttonWithdraw,
    divButtonsModal
  );
  divButtonsModal.append(buttonCancel, buttonInsert);

  return divScreen;
}