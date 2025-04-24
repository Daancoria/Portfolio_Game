# Cabin Portfolio Game (Multilingual Edition)

This project is based on the original [Portfolio_Game by @sicarius777](https://github.com/sicarius777/Portfolio_Game/tree/main), and has been significantly enhanced to serve as an interactive, multilingual portfolio built using Kaboom.js.

---

## 🔧 Major Updates & Enhancements

### 🌍 Multilingual Support
- Introduced full **multilingual localization** using a dynamic `lang.js` module.
- Languages supported:
  - 🇺🇸 English
  - 🇪🇸 Spanish
  - 🇫🇷 French
  - 🇮🇹 Italian
- Dialogue and UI text dynamically change using a language selector.
- Language preference is stored in `localStorage` for persistence across sessions.

### 🗣 Dynamic Translations
- Dialogue interactions now use keys (e.g., `"pc"`, `"resume"`, `"tv"`) that map to localized strings in the `translations` object.
- Accent-sensitive fonts added to ensure proper display of characters like `é`, `à`, `ç`, `ó`, etc.

### 💬 Updated UI (index.html)
- Added a `<select>` dropdown in the top-right corner to change languages.
- Applied the **VT323** font from Google Fonts specifically to text elements that may contain accented characters (like the dialogue box, note text, and close button).

### 🎮 Code Updates
- `main.js`:
  - Now imports `setLanguage`, `getLanguage`, and `translations` from `langs.js`
  - Listens for language changes from the selector and updates UI text accordingly
- `utils.js`:
  - `displayDialogue()` now accepts a dialogue key and pulls the translated string
  - Improved event listener cleanup to prevent memory leaks and errors
- `langs.js`:
  - Stores the current language
  - Provides translation mappings per language
  - Contains `setLanguage()` and `getLanguage()` for shared use across the app

### 🎨 Font Compatibility Fix
- Replaced default `monogram` font in dialogue box with `VT323` to ensure proper Unicode support while keeping the retro game feel intact.

---

## 📦 How to Use

1. Clone the repo
2. Run the app using a local server (e.g., with Vite or Live Server)
3. Click around the cabin to explore interactive hotspots
4. Use the language selector in the top-right to switch languages on the fly

---

## 🧩 Dependencies

- [Kaboom.js](https://kaboomjs.com/) – for game logic and rendering
- [VT323](https://fonts.google.com/specimen/VT323) – Google font for multilingual support
- Optional: [Vite](https://vitejs.dev/) for dev server and hot reload

---

## 🧠 Credits

Original concept and codebase by [@sicarius777](https://github.com/sicarius777).  
Multilingual enhancements and customization by Daniel Coria ([@Daancoria](https://github.com/Daancoria)).