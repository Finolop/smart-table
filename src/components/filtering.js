export function initFiltering(elements) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action?.name === "clear") {
      const input = action.parentElement.querySelector("input");
      const field = action.dataset.field;

      input.value = "";
      state[field] = "";
    }

    const filter = {};

    Object.keys(elements).forEach((key) => {
      const el = elements[key];

      if (el && ["INPUT", "SELECT"].includes(el.tagName) && el.value) {
        filter[`filter[${el.name}]`] = el.value;
      }
    });

    return Object.keys(filter).length ? { ...query, ...filter } : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
