export class DetailsButtonView{
    constructor(closeListener, addToCartListener){
        this.modalWindow = document.querySelector('div.details-modal');
        this.modaTitle = this.modalWindow.querySelector('.modal-title');
        this.modalBody = this.modalWindow.querySelector('.modal-body');
        this.modalFooter = this.modalWindow.querySelector('.modal-footer');

        this.addToCartListener = addToCartListener;
        $(this.modalWindow).on('hidden.bs.modal', closeListener);
    }

    show(data){
        const {id, species, name, image, price, gender, weight, birth_date, color, breed, is_sterile, hair, description} = data;
        this.modaTitle.innerHTML = name[0].toUpperCase() + name.slice(1,);
        const node = `
          <div class="animal-img" style="background-image: url(${image})"></div>
          <div class="animal-info row">
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Specie: <span>${species}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Breed: <span>${breed}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Gender: <span>${gender}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Date of birthday: <span>${birth_date}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Weight: <span>${weight}kg.</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Color: <span>${color}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Hair: <span>${hair}</span></p>
            </div>
            <div class="box col-12 col-md-4 col-lg-3">
                <p>Sterile: <span>${is_sterile ? 'yes' : 'no'}</span></p>
            </div>
            <div class="box col-12">
                <p>Description: <span>${description}</span></p>
            </div>
            <div class="box col-12">
                <p class="col-12" style="font-size: 21px; text-transform: uppercase; padding: 0;">Price: <span>${price}$</span></p>
            </div>
          </div>
        `;
        this.modalBody.innerHTML = node;

        //Bad practise???
        this.modalFooter.innerHTML = `
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary modal-add-to-cart" data-dismiss="modal">Add to cart</button>
        `;
        this.modalFooter.querySelector('.modal-add-to-cart').addEventListener('click', (ev)=>{this.addToCartListener(data)});
        //Bad practise???
        $(this.modalWindow).modal('show');
    }

    close(){
        this.modaTitle.innerHTML = '';
        this.modalBody.innerHTML = '';
    }
}