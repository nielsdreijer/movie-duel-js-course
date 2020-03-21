const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  // create the dropdown menu (use bulma css-framework)
  root.innerHTML = `
<label><b>Search</b></label>
<input class="input" />
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
  </div>
</div>
`;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  // when typing in input field, do this
  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    // close dropdown if no movies exists
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");

      // add dropdown-class from css-framework and attach image too
      option.classList.add("dropdown-item");

      // get renderOptions
      option.innerHTML = renderOption(item);

      // when clicking on the movie (the link)
      option.addEventListener("click", () => {
        // close dropdown on click
        dropdown.classList.remove("is-active");

        // add text input on selected movie to input field
        input.value = inputValue(item);

        onOptionSelect(item);
      });

      // add the newly created link (option) to the resultsWrapper
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
