/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  if (!containerElement) return null

  const handler = (event) => {
    let target = event.target
    if (target.closest(".guest-item") && target.classList.contains("remove-btn")) {
      target.closest(".guest-item").remove()
    }
  }
  containerElement.addEventListener("click", handler)


  return {
    addGuest(name, side) {
      let div = document.createElement('div')
      div.classList.add("guest-item")
      div.setAttribute("data-name", name)
      div.setAttribute("data-side", side)

      let span = document.createElement('span')
      span.textContent = name

      let btn = document.createElement("button")
      btn.classList.add("remove-btn")
      btn.textContent = "Remove"

      div.appendChild(span)
      div.appendChild(btn)

      containerElement.appendChild(div)
      return div
    },

    removeGuest(name) {
      const target = [...containerElement.querySelectorAll(".guest-item")].find(e => e.querySelector("span").textContent === name)
      if (target) {
        target.remove()
        return true
      }
      return false
    },

    getGuests() {
      let targets = containerElement.querySelectorAll(".guest-item")
      const result = []
      targets.forEach(target => {
        result.push({
          name: target.querySelector("span").textContent,
          side: target.getAttribute("data-side")
        })
      });
      return result
    }
  }
}

export function setupThemeSelector(containerElement, previewElement) {
  if (!containerElement || !previewElement) return null

  let traditionalBtn = document.createElement("button")
  traditionalBtn.classList.add("theme-btn")
  traditionalBtn.setAttribute("data-theme", "traditional")
  traditionalBtn.textContent = "traditional"

  let modernBtn = document.createElement("button")
  modernBtn.classList.add("theme-btn")
  modernBtn.setAttribute("data-theme", "modern")
  modernBtn.textContent = "modern"

  let royalBtn = document.createElement("button")
  royalBtn.classList.add("theme-btn")
  royalBtn.setAttribute("data-theme", "royal")
  royalBtn.textContent = "royal"

  containerElement.appendChild(traditionalBtn)
  containerElement.appendChild(modernBtn)
  containerElement.appendChild(royalBtn)

  const handler = (event) => {
    const target = event.target
    if (target.classList.contains("theme-btn")) {
      previewElement.classList.add(target.textContent)
      previewElement.setAttribute("data-theme", target.getAttribute("data-theme"))
    }
  }
  containerElement.addEventListener("click", handler)

  return {
    getTheme() {
      return previewElement.getAttribute("data-theme") || null
    }
  }
}

export function setupCardEditor(cardElement) {
  if (!cardElement) return null

  const handle = (event) => {
    const editable = event.target.closest("[data-editable]")
    const curr = cardElement.querySelector(".editing")
    if (curr) {
      curr.contentEditable = "false"
      curr.classList.remove("editing")
    }
    if (editable) {
      editable.contentEditable = "true"
      editable.classList.add("editing")
    }
  }
  cardElement.addEventListener("click", handle)

  return {
    getContent(field) {
      let target = cardElement.querySelector(`[data-editable="${field}"]`)
      return target ? target.textContent : null
    }
  }
}
