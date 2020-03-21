export class RenderView {
  constructor(detailsListener) {
    this.animalContainer = document.querySelector('#animalContainer');
    this.loader = document.querySelector('div.loader');
    this.pageNum = document.querySelector('#pageIndex');

    this.detailsListener = detailsListener; //DetailsBtn eventListener callback
  }

  //render all card into DOM
  renderData(arr) {
    this.animalContainer.innerHTML = ''; //Clear animalContainer
    arr.forEach(elem => {
      this.animalContainer.appendChild(this.renderSingleAnimal(elem));
    });
  }

  //single card structure
  renderSingleAnimal({id, species, name, image, price, gender, weight, birth_date, color, breed, is_sterile, hair, description}) {
    const uName = name[0].toUpperCase() + name.slice(1);
    const node = document.createElement('div');
    node.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-xl-3', 'p-2');
    node.innerHTML = `
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
                        <a href="#" class="btn btn-card font-weight-bold details-btn">Details</a>
                    </div>
                </div>
            </div>
    `;
    node.querySelector('a.details-btn').addEventListener('click', (ev)=>{
      ev.preventDefault();
      this.detailsListener(id)
    });
    return node;
  }

  renderPageNum(num = 1) {
    this.pageNum.innerHTML = `${num}`;
  }

  offPreloader(){
    this.fadeOut(this.loader, document.body);
  }

  fadeOut(node, parent){
    const fadeStep = 1 / (1000 / 40);  //1-max opacity val, 1000 - 1 second, 30 - fps;
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