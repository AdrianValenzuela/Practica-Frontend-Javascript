export const adView = (ad, status) => {
  return `<div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${ad.ad}</p>
        </div>
      </div>
      <div class="content">
        <p>Precio: ${ad.price} €</p>
        <p>Status: ${status[ad.status]}</p>
        <p>Tags: ${ad.tags}</p>
        <time datetime="${ad.createdAt}">${ad.createdAt}</time>
        <img src="${ad.photo}">
      </div>
    </div>
    </div>
  </div>`;
};