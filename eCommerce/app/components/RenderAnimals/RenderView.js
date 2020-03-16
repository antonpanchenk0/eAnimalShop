export class RenderView {
  constructor(renderAnimals, handleClickPaginationNext, handleClickPaginationPrev) {
    this.animalContainer = document.querySelector('#animalContainer') 
    window.addEventListener('load', renderAnimals);
  }

  renderData(arr) {
    this.animalContainer.innerHTML = arr.map(animal => this.renderSingleAnimal(animal)).join('');
  }

  renderSingleAnimal({id, species, price, name, gender, weight, birth_date, color, breed, image, is_sterile, hair}) {
    return `
         <div class="col-12 col-sm-6 col-md-4 col-xl-3 p-2">
            <div class="card p-0">
                <div class="animal-img" style="background-image: url('${image}')"></div>
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">Breed: <span>${breed}</span></p>
                        <p class="card-price">Price: ₴<span>${price}</span></p>
                    </div>
                    <div class="card-footer d-flex justify-content-center align-items-center p-1">
                        <a href="#" class="btn btn-card w-50 font-weight-bold">Add to cart</a>
                        <a href="#" class="btn btn-card w-50 font-weight-bold" data-toggle="modal" data-target="#modalWindow">Details</a>
                    </div>
                </div>
            </div>
         </div>
    `;
  }
}