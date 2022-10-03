function addValue() {
  const buttonNewValueHeader = document.querySelector(".button-nav");
  buttonNewValueHeader.addEventListener("click", openModal);
}

function addFinancialRecord(list) {
  const section = document.querySelector(".new-section");
  section.innerText = "";
  const ul = document.createElement("ul");
  ul.classList.add("container");
  section.appendChild(ul);

  list.forEach((element) => {
    const li = document.createElement("li");
    const pValue = document.createElement("p");
    const div = document.createElement("div");
    const pType = document.createElement("p");
    const buttonTrash = document.createElement("button");
    const img = document.createElement('img');

    li.classList.add(
      "item-registered-value",
      "margin-5",
      "flex",
      "align-center",
      "justify-between",
      "padding-5"
    );
    li.id = element.id;
    pValue.classList.add("color-grey-1", "text-2-medium");
    div.classList.add("width-50", "flex", "justify-between", "align-center");
    pType.classList.add(
      "type-item",
      "bg-grey-4",
      "color-grey-2",
      "text-2-regular",
      "padding-5"
    );
    buttonTrash.classList.add("button-trash");
    img.src = "/assets/trash.png";
    img.alt = "Trash";

    pValue.innerText = `R$ ${element.value}`;
    if (element.categoryID === 1) {
      pType.innerText = "Entrada";
    } else if (element.categoryID === 2) {
      pType.innerText = "Saída";
    }
    buttonTrash.addEventListener("click", () => {
      buttonTrash.id = element.id;
      if (buttonTrash.id === li.id) {
        const index = insertedValues.indexOf(element, 0);
        insertedValues.splice(index, 1);
        li.remove();
        addValueSum(insertedValues);
        addFinancialRecord(insertedValues);
        noRecordedValues(insertedValues);
      }
    });

    ul.appendChild(li);
    li.append(pValue, div);
    div.append(pType, buttonTrash);
    buttonTrash.appendChild(img);
    addValueSum(insertedValues);
  });
}

function addValueSum(list) {
  const pValueSum = document.querySelector(".value-sum");
  let acc = 0;
  list.forEach((element) => {
    if (element.categoryID === 1) {
      acc += element.value;
    } else if (element.categoryID === 2) {
      acc -= element.value;
    }
  });
  pValueSum.innerText = `R$ ${acc}`;
  if (acc < 0) {
    pValueSum.classList.add("color-red");
  } else {
    pValueSum.classList.remove("color-red");
  }
}

function noRecordedValues(list) {
  if (list.length === 0) {
    const section = document.querySelector(".new-section");

    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const button = document.createElement("button");

    div.classList.add(
      "no-registered-values",
      "container",
      "flex",
      "flex-col",
      "justify-center",
      "align-center",
      "margin-1",
      "padding-1"
    );
    h2.classList.add("text-no-registered", "color-grey-1", "title-2-bold");
    button.classList.add(
      "button-no-registered",
      "margin-1",
      "color-grey-1",
      "text-2-medium"
    );

    h2.innerText = "Nenhum valor cadastrado";
    button.innerText = "Registrar novo valor";
    button.addEventListener("click", openModal);

    section.appendChild(div);
    div.append(h2, button);
  }
}

const filterByCategory = function (list, category) {
  const filterList = list.filter((element) => {
    return element.categoryID === category;
  });
  return filterList;
};

const all = document.querySelector(".all");
all.addEventListener("click", () => {
  all.classList.toggle("button-filter");
  const deposit = document.querySelector(".deposit");
  const withdraw = document.querySelector(".withdraw");
  deposit.classList.remove("button-filter");
  withdraw.classList.remove("button-filter");
  addFinancialRecord(insertedValues);
  addValueSum(insertedValues);
  noRecordedValues(insertedValues);
});

const deposit = document.querySelector(".deposit");
deposit.addEventListener("click", () => {
  deposit.classList.toggle("button-filter");
  const all = document.querySelector(".all");
  const withdraw = document.querySelector(".withdraw");
  all.classList.remove("button-filter");
  withdraw.classList.remove("button-filter");
  const filter = filterByCategory(insertedValues, 1);
  addFinancialRecord(filter);
  addValueSum(filter);
  noRecordedValues(filter);
});

const withdraw = document.querySelector(".withdraw");
withdraw.addEventListener("click", () => {
  withdraw.classList.toggle("button-filter");
  const all = document.querySelector(".all");
  const deposit = document.querySelector(".deposit");
  all.classList.remove("button-filter");
  deposit.classList.remove("button-filter");
  const filter = filterByCategory(insertedValues, 2);
  addFinancialRecord(filter);
  addValueSum(filter);
  noRecordedValues(filter);
});

noRecordedValues(insertedValues);
addFinancialRecord(insertedValues);
addValue();
addValueSum(insertedValues);