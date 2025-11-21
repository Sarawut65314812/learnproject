// Configuration
const API_URL = 'http://localhost:5000/api';

// Track visitor on page load
async function trackVisitor() {
    try {
        const visitorData = {
            page: window.location.pathname,
            referrer: document.referrer || 'direct',
        };

        await fetch(`${API_URL}/track`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorData),
        });

        console.log('✅ Visitor tracked successfully');
    } catch (error) {
        console.error('❌ Error tracking visitor:', error);
    }
}

// Fetch and display items
async function loadItems() {
    const contentDiv = document.getElementById('content');

    try {
        const response = await fetch(`${API_URL}/items`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        const items = await response.json();

        if (items.length === 0) {
            contentDiv.innerHTML = `
                <div class="no-items">
                    <h2>No items available at the moment</h2>
                    <p>Please check back later!</p>
                </div>
            `;
            return;
        }

        // Create items grid
        const itemsHTML = items.map(item => `
            <div class="item-card">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="item-image">` : '<div class="item-image"></div>'}
                <h2 class="item-title">${item.title}</h2>
                <p class="item-description">${item.description || 'No description available'}</p>
                <div class="item-meta">
                    <span class="item-price">$${item.price ? item.price.toFixed(2) : '0.00'}</span>
                    ${item.category ? `<span class="item-category">${item.category}</span>` : ''}
                </div>
            </div>
        `).join('');

        contentDiv.innerHTML = `<div class="items-grid">${itemsHTML}</div>`;

    } catch (error) {
        console.error('❌ Error loading items:', error);
        contentDiv.innerHTML = `
            <div class="error">
                <h2>⚠️ Error Loading Items</h2>
                <p>${error.message}</p>
                <p>Please make sure the backend server is running on ${API_URL}</p>
            </div>
        `;
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Track visitor
    trackVisitor();
    
    // Load items
    loadItems();
});
