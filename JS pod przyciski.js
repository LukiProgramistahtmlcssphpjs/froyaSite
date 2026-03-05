/* --- PANCERNY JS DLA DUO GYM (WERSJA WINDOW) --- */
// Konfiguracja API
const apiKey = "AIzaSyDBNZHamE8jTV088f4SwKvncAwFtIAcXZU"; // <--- TU WKLEJ KLUCZ API GOOGLE

// 1. FUNKCJA GENERUJĄCA TRENING
window.generateWorkout = async function() {
    const goal = document.getElementById('goal').value;
    const level = document.getElementById('level').value;
    const resultBox = document.getElementById('ai-result');
    const resultContent = document.getElementById('ai-content');
    const spinner = document.getElementById('ai-spinner');

    // Sprawdzenie klucza
    if (!apiKey && window.location.hostname !== 'generativelanguage.googleapis.com') {
         alert("Uwaga: Aby trener AI działał, musisz uzupełnić klucz API w pliku JS.");
         return;
    }

    // UI Start
    resultBox.style.display = 'none';
    spinner.style.display = 'block';
    resultContent.innerHTML = '';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const prompt = `Trener personalny DUO GYM. Styl: motywujący, konkretny, gym bro. 
    Cel: ${goal}, Poziom: ${level}. 
    Wypisz 3-4 ćwiczenia w punktach HTML (<ul>). Bez wstępu.`;

    const data = { contents: [{ parts: [{ text: prompt }] }] };

    try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const json = await response.json();
        if (json.candidates) {
            resultContent.innerHTML = json.candidates[0].content.parts[0].text.replace(/```html/g, '').replace(/```/g, '');
        } else { resultContent.innerHTML = '<p style="color: #ff5555;">Błąd. Sprawdź klucz API.</p>'; }
    } catch (error) { 
        console.error(error);
        resultContent.innerHTML = '<p style="color: #ff5555;">Błąd połączenia z trenerem AI.</p>'; 
    } 
    finally { spinner.style.display = 'none'; resultBox.style.display = 'block'; }
};

// 2. FUNKCJA WYBORU ZESTAWU
window.selectBundle = function(element, type) {
    // Usuń klasę active ze wszystkich kart
    var allCards = document.querySelectorAll('.bundle-card');
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('active');
    }
    // Dodaj klasę active do klikniętej
    element.classList.add('active');
    console.log("Wybrano zestaw: " + type);
};

// 3. FUNKCJA KARUZELI ZDJĘĆ
window.moveCarousel = function(carouselId, direction) {
    const container = document.getElementById('carousel-' + carouselId);
    if (!container) return;
    
    const slides = container.querySelectorAll('.carousel-slide');
    let activeIndex = 0;

    // Znajdź aktywny slajd (pętla for dla kompatybilności)
    for (let i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('active')) {
            activeIndex = i;
            slides[i].classList.remove('active');
            break;
        }
    }

    // Oblicz nowy indeks
    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    // Pokaż nowy slajd
    slides[newIndex].classList.add('active');
};

// 4. FUNKCJA FAQ
window.toggleFaq = function(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
};
