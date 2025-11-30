// === INTERACTIONS ===
document.addEventListener('DOMContentLoaded', () => {

    // 1. Card Expansion Logic
    const cards = document.querySelectorAll('[data-card]');

    cards.forEach(card => {
        const openBtn = card.querySelector('.btn-open');
        const closeBtn = card.querySelector('.btn-close-card');
        const copyBtn = card.querySelector('.btn-copy');
        const codeBlock = card.querySelector('code');

        // Toggle Expand
        const toggleCard = (e) => {
            e?.stopPropagation();
            const isActive = card.classList.contains('active');

            // Close others
            cards.forEach(c => c.classList.remove('active'));

            if (!isActive) {
                card.classList.add('active');
            }
        };

        openBtn?.addEventListener('click', toggleCard);
        closeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('active');
        });

        // Copy Code
        if (copyBtn && codeBlock) {
            copyBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText);
                    const originalText = copyBtn.innerText;
                    copyBtn.innerText = 'Copiado!';
                    copyBtn.style.color = '#4ade80';
                    setTimeout(() => {
                        copyBtn.innerText = originalText;
                        copyBtn.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy', err);
                }
            });
        }
    });

    // 2. Typing Effect for Title
    const titleElement = document.querySelector('.profile-name');
    if (titleElement) {
        const text = titleElement.innerText;
        titleElement.innerText = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                titleElement.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add cursor blink class if wanted
                titleElement.style.borderRight = 'none';
            }
        };

        // Start after a small delay
        setTimeout(typeWriter, 500);
    }
});


