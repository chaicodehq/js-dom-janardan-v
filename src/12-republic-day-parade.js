/**
 * 🇮🇳 Republic Day Parade - Capstone: All DOM Concepts Combined
 *
 * Republic Day parade ka live dashboard bana rahe hain! Multiple DOM
 * concepts ek saath use honge - createElement, appendChild, classList,
 * dataset, event delegation, DOM traversal, insertBefore, sab kuch.
 * Jaise 26 January ko Rajpath pe alag alag contingents march karte hain
 * aur commentary team sab track karti hai, waise hi tum DOM se parade
 * ka poora dashboard manage karoge. Yeh CAPSTONE challenge hai - saare
 * DOM skills combine karo!
 *
 * Functions:
 *
 *   1. createContingent(name, type, state, members)
 *      - Creates a div.contingent with:
 *        - data-name attribute = name
 *        - data-type attribute = type (e.g., "military", "cultural", "school")
 *        - data-state attribute = state (e.g., "Maharashtra", "Punjab")
 *        - h3 with textContent = name
 *        - span.type with textContent = type
 *        - span.state with textContent = state
 *        - ul with each member as an li element
 *      - Returns the div element
 *      - Validation: name (string), type (string), state (string),
 *        members (array of strings). Agar invalid, return null.
 *
 *   2. setupParadeDashboard(container)
 *      - Sets up the parade dashboard on container element
 *      - Returns object with these methods:
 *
 *        addContingent(contingent)
 *          - contingent: { name, type, state, members }
 *          - Creates element using createContingent()
 *          - Appends to container
 *          - Returns the created element, or null if invalid
 *
 *        removeContingent(name)
 *          - Finds .contingent child with data-name matching name
 *          - Removes it from container
 *          - Returns true if found and removed, false if not found
 *
 *        moveContingent(name, direction)
 *          - direction: "up" or "down"
 *          - "up": swaps contingent with its previousElementSibling
 *            (uses insertBefore to place it before its previous sibling)
 *          - "down": swaps with its nextElementSibling
 *            (uses insertBefore to place next sibling before this element)
 *          - Returns true if moved, false if can't move (no sibling in that direction)
 *          - Returns false if contingent not found
 *
 *        getContingentsByType(type)
 *          - Finds all .contingent children with data-type matching type
 *          - Returns array of elements
 *
 *        highlightState(state)
 *          - Adds class "highlight" to all .contingent children with
 *            data-state matching state
 *          - Removes class "highlight" from all other .contingent children
 *          - Returns count of highlighted contingents
 *
 *        getParadeOrder()
 *          - Returns array of contingent names in current DOM order
 *          - Reads data-name from each .contingent child
 *
 *        getTotalMembers()
 *          - Counts ALL li elements across all contingents in container
 *          - Returns the total count
 *
 *      - Agar container null/undefined, return null
 *
 * Hint: Yeh capstone hai - createElement, appendChild, classList, dataset,
 *   querySelectorAll, insertBefore, removeChild sab use hoga. Har method
 *   mein ek alag DOM concept practice hoga.
 *
 * @example
 *   const container = document.createElement("div");
 *   const dashboard = setupParadeDashboard(container);
 *
 *   dashboard.addContingent({
 *     name: "Punjab Regiment",
 *     type: "military",
 *     state: "Punjab",
 *     members: ["Col. Singh", "Maj. Kaur", "Capt. Gill"]
 *   });
 *
 *   dashboard.addContingent({
 *     name: "Bharatanatyam Group",
 *     type: "cultural",
 *     state: "Tamil Nadu",
 *     members: ["Lakshmi", "Priya", "Deepa", "Meena"]
 *   });
 *
 *   dashboard.getParadeOrder();
 *   // => ["Punjab Regiment", "Bharatanatyam Group"]
 *
 *   dashboard.moveContingent("Bharatanatyam Group", "up");
 *   // => true
 *   dashboard.getParadeOrder();
 *   // => ["Bharatanatyam Group", "Punjab Regiment"]
 *
 *   dashboard.getContingentsByType("military");
 *   // => [element for Punjab Regiment]
 *
 *   dashboard.highlightState("Punjab");
 *   // => 1 (Punjab Regiment highlighted)
 *
 *   dashboard.getTotalMembers();
 *   // => 7 (3 + 4)
 *
 *   dashboard.removeContingent("Punjab Regiment");
 *   // => true
 */
export function createContingent(name, type, state, members) {
  if (!name || !type || !state || !members || typeof name !== "string" || typeof type !== "string" || typeof state !== "string" || !Array.isArray(members)) return null
  let div = document.createElement("div")
  div.classList.add("contingent")
  div.dataset.name = name
  div.dataset.state = state
  div.dataset.type = type

  let head = document.createElement('h3')
  head.textContent = name

  let typeSpan = document.createElement('span')
  typeSpan.classList.add("type")
  typeSpan.textContent = type

  let stateSpan = document.createElement('span')
  stateSpan.classList.add("state")
  stateSpan.textContent = state

  let list = document.createElement("ul")
  members.forEach(member => {
    let li = document.createElement('li')
    li.textContent = member
    list.appendChild(li)
  })

  div.appendChild(head)
  div.appendChild(typeSpan)
  div.appendChild(stateSpan)
  div.appendChild(list)

  return div
}

export function setupParadeDashboard(container) {
  if (!container) return null
  return {
    addContingent(contingent) {
      let { name, type, state, members } = contingent
      let element = createContingent(name, type, state, members)
      if (element) {
        container.appendChild(element)
        return element
      }
      return null
    },
    removeContingent(name) {
      let contingents = Array.from(container.querySelectorAll(".contingent"))
      for (const contingent of contingents) {
        if (contingent.dataset.name === name) {
          container.removeChild(contingent)
          return true
        }
      }
      return false
    },
    moveContingent(name, direction) {
      if (!name) return false
      let target = Array.from(container.querySelectorAll(".contingent")).find(cont => cont.dataset.name === name)
      if (!target) return false
      let parent = target.parentNode
      switch (direction) {
        case "up":
          let prev = target.previousElementSibling
          if (!prev) return false
          parent.insertBefore(target, prev)
          return true

        case "down":
          let next = target.nextElementSibling
          if (!next) return false
          parent.insertBefore(next, target)
          return true
        default:
          return false
      }
    },
    getContingentsByType(type) {
      return Array.from(container.querySelectorAll(".contingent")).filter(cont => cont.dataset.type === type)
    },
    highlightState(state) {
      let count = 0
      Array.from(container.querySelectorAll(".contingent")).forEach(cont => {
        if (cont.dataset.state === state) {
          cont.classList.add("highlight")
          count++
        } else {
          cont.classList.remove("highlight")
        }
      })
      return count
    },
    getParadeOrder() {
      let result = []
      let contArray = Array.from(container.querySelectorAll(".contingent"))
      contArray.map(cont => result.push(cont.dataset.name))
      return result
    },
    getTotalMembers() {
      let liCount = 0
      let contArray = Array.from(container.querySelectorAll(".contingent"))
      contArray.forEach(cont => liCount += cont.querySelectorAll("li").length)
      return liCount
    }
  }
}
