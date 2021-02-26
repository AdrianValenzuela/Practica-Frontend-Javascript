function canBeUpdatedOrDeleted(permitted) {
    let buttons = '';
    if (permitted) {
        buttons = `<div class="new-ad">
                        <span class="login-register-buttons">
                            <a class="button updateButton is-info">Update</a>
                            <a class="button deleteButton is-danger">Delete</a>
                        </span>
                    </div>`;
    }

    return buttons;
}

export const adDetailView = (ad) => {
    return `<h1 class="title">${ad.ad}</h1>
            <div class="ad-container">
                <img class="ad-img" src="${ad.photo}">
                <div class="ad">
                    <p>Price: ${ad.price}€</p>
                    <p>Status: ${ad.status}</p>
                    <p>Tags: ${ad.tags}</p>
                </div>
            </div>
            ${canBeUpdatedOrDeleted(ad.canBeUpdatedOrDeleted)}`;
}