export class RenderView {
  constructor() {
    this.animalContainer = document.querySelector('#animalContainer');
    this.loader = document.querySelector('div.loader');
  }

  //отображение всех карточек животных
  renderData(arr) {
    this.animalContainer.innerHTML = arr.map(animal => this.renderSingleAnimal(animal)).join('');
  }

  //Рендер карточки животного
  renderSingleAnimal({id, species, price, name, gender, weight, birth_date, color, breed, image, is_sterile, hair}) {
    const uName = name[0].toUpperCase() + name.slice(1);
    return `
         <div class="col-12 col-sm-6 col-md-4 col-xl-3 p-2">
            <div class="card p-0">
                <div class="animal-img" style="background-image: url('${image}')"></div>
                    <div class="card-body">
                        <h5 class="card-title">${uName}</h5>
                        <p class="card-text">Breed: <span>${breed}</span></p>
                        <p class="card-text">Gender: <span>${gender}</span></p>
                        <p class="card-price">Price: ₴<span>${price}</span></p>
                    </div>
                    <div class="card-footer d-flex justify-content-around align-items-center p-1">
                        <a href="#" class="btn btn-card font-weight-bold">Add to cart</a>
                        <a href="#" class="btn btn-card font-weight-bold" data-toggle="modal" data-target="#modalWindow">Details</a>
                    </div>
                </div>
            </div>
         </div>
    `;
  }

  offPreloader(){
    this.fadeOut(this.loader, document.body);
  }

  fadeOut(node, parent){
    const fadeStep = 1 / (1000 / 40);  //1-max opacity val, 1000 - 1 second, 30 - fps;
    console.log(fadeStep)
    let opacity = 1;
    let interval = setInterval(()=>{
      node.style.opacity = opacity;
      opacity -= fadeStep;
      if(opacity <= 0){
        clearInterval(interval);
        parent.removeChild(node);
      }
    }, 30); //30 - fps
  }
}