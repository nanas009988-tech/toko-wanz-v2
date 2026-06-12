/**
 * =========================================================
 * TopUpCode - Main Script
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeLoadingScreen();
    initializeGameCards();
});

/**
 * =========================================================
 * Loading Screen
 * =========================================================
 */
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");

    if (!loadingScreen) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            loadingScreen.style.transition = "opacity 0.6s ease, visibility 0.6s ease";
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";

            setTimeout(() => {
                loadingScreen.remove();
            }, 700);
        }, 800);
    });
}

/**
 * =========================================================
 * Game Card Events
 * =========================================================
 */
function initializeGameCards() {
    const gameCards = document.querySelectorAll(".game-card");

    if (!gameCards.length) return;

    const selectedGame = localStorage.getItem("selectedGame");

    if (selectedGame) {
        gameCards.forEach((card) => {
            const gameName = card.dataset.game;

            if (gameName === selectedGame) {
                card.classList.add("active");
            }
        });
    }

    gameCards.forEach((card) => {
        card.addEventListener("click", () => {
            handleGameSelection(card, gameCards);
        });
    });
}

/**
 * =========================================================
 * Handle Game Selection
 * =========================================================
 */
function handleGameSelection(selectedCard, allCards) {
    const gameName = selectedCard.dataset.game;

    if (!gameName) return;

    allCards.forEach((card) => {
        card.classList.remove("active");
    });

    selectedCard.classList.add("active");

    localStorage.setItem("selectedGame", gameName);

    showToast(`${gameName} dipilih`);

    setTimeout(() => {
        redirectWithFade("form.html");
    }, 900);
}

/**
 * =========================================================
 * Modern Toast
 * =========================================================
 */
function showToast(message) {
    const container = document.getElementById("toast-container");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        toast.style.transition = "all 0.3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(20px)";

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

/**
 * =========================================================
 * Page Fade Out + Redirect
 * =========================================================
 */
function redirectWithFade(url) {
    document.body.style.transition =
        "opacity 0.45s ease, transform 0.45s ease";

    document.body.style.opacity = "0";
    document.body.style.transform = "scale(0.98)";

    setTimeout(() => {
        window.location.href = url;
    }, 450);
}